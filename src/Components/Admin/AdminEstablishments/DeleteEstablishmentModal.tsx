import React from "react";
import { useMutation } from "@apollo/client";
import styled from "styled-components";

import { DeleteEstablishment, DeleteEstablishmentVariables } from "../../../GraphQL/__generated__/DeleteEstablishment";
import { DELETE_ESTABLISHMENT_MUTATION } from "../../../GraphQL/Mutations";
import { ADMIN_GET_ALL_ESTABLISHMENTS_QUERY } from "../../../GraphQL/Queries";
import Modal from "../../Shared/Modal";
import Button from "../../Shared/Form/Button";

const StyledModal = styled(Modal)`
    align-items: center;
    max-width: 600px;

    h1 {
        font-size: 18px;
        margin: 0 30px 10px 30px;
        text-align: center;
    }

    p {
        color: ${(props): string => props.theme.colors.error};
        text-align: center;
    }

    .buttonsWrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;

        @media only screen and (min-width: 450px) {
            flex-direction: row;
        }
    }

    .confirmButton {
        background-color: ${(props): string => props.theme.colors.success};
        margin: 10px;

        &:focus,
        &:hover {
            background-color: ${(props): string => props.theme.colors.successDark};
        }
    }

    .errorButton {
        background-color: ${(props): string => props.theme.colors.error};
        margin: 10px;

        &:focus,
        &:hover {
            background-color: ${(props): string => props.theme.colors.errorDark};
        }
    }
`;

type Props = {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    establishment: { id: string; name: string };
    setEstablishment: (establishment: { id: string; name: string }) => void;
};

const DeleteEstablishmentModal: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { showModal, setShowModal, establishment, setEstablishment } = props;

    const [deleteEstablishment, { loading }] = useMutation<DeleteEstablishment, DeleteEstablishmentVariables>(
        DELETE_ESTABLISHMENT_MUTATION
    );

    return (
        <StyledModal showModal={showModal} setShowModal={setShowModal}>
            <h1>Are you sure you want to delete {establishment.name}?</h1>
            <p>Warning: This will also delete all enquiries associated with this establishment</p>
            <div className="buttonsWrapper">
                <Button
                    className="confirmButton"
                    disabled={loading}
                    onClick={async (): Promise<void> => {
                        await deleteEstablishment({
                            variables: { id: establishment.id },
                            refetchQueries: [{ query: ADMIN_GET_ALL_ESTABLISHMENTS_QUERY }],
                            awaitRefetchQueries: true
                        });
                        setEstablishment({ id: "", name: "" });
                        setShowModal(false);
                    }}
                >
                    Yes
                </Button>
                <Button disabled={loading} className="errorButton" onClick={(): void => setShowModal(false)}>
                    No
                </Button>
            </div>
        </StyledModal>
    );
};

export default DeleteEstablishmentModal;
