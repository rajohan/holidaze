import React from "react";
import styled from "styled-components";
import { Form as FormikForm } from "formik";

const StyledForm = styled(FormikForm)`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

type Props = {
    children: React.ReactNode;
};

const Form: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    return (
        <StyledForm {...props} noValidate={true}>
            {props.children}
        </StyledForm>
    );
};

export default Form;
