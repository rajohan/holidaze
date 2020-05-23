export type Establishment = {
    id: string;
    name: string;
    imageUrl: string;
    maxGuests: number;
    price: number;
};

export type EstablishmentFull = Establishment & {
    googleLat: number;
    googleLong: number;
    description: string;
    selfCatering: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type AdminEstablishment = {
    id: string;
    name: string;
    email: string;
};

export type Enquiry = {
    id: string;
    clientName: string;
    email: string;
    checkin: Date;
    checkout: Date;
};

export type EnquiryWithEstablishment = Enquiry & { establishment: { id: string; name: string } };

export type Message = {
    id: string;
    clientName: string;
    email: string;
    createdAt: Date;
};

export interface GetAllEstablishmentsData {
    getAllEstablishments: Establishment[];
}

export interface GetEstablishmentData {
    getEstablishment: EstablishmentFull;
}

export interface AdminGetAllEstablishmentsData {
    getAllEstablishments: AdminEstablishment[];
}

export interface GetAllEnquiriesData {
    getAllEnquiries: EnquiryWithEstablishment[];
}

export interface GetAllMessagesData {
    getAllMessages: Message[];
}

export interface LoginResponse {
    login: {
        authToken: string;
    };
}

export interface RefreshAuthTokensResponse {
    refreshAuthTokens: {
        authToken: string;
    };
}
