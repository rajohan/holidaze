import React from "react";
import styled from "styled-components";
import AdminEnquiries from "./AdminEnquiries";
import AdminEstablishments from "./AdminEstablishments";
//import AdminMessages from "./AdminMessages";

const StyledAdmin = styled.div`
    width: 100%;
`;

const Admin: React.FC = (): React.ReactElement => {
    return (
        <StyledAdmin>
            <AdminEnquiries />
            {/*<AdminMessages />*/}
            <AdminEstablishments />
        </StyledAdmin>
    );
};

export default Admin;
