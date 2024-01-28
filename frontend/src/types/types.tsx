//////////////////
//// Clients ////
////////////////

import React from "react";

export interface ClientsProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
    pets?: PetsProps[];
}

export interface ClientCreateProps {
    name?: string;
    email?: string;
    phone?: string;
}

export interface ClientUpdateProps {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    pets?: PetsProps[];
}

export interface ClientTableBodyProps {
    setSelectedClient: React.Dispatch<React.SetStateAction<ClientsProps | null>>;
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
    clients: ClientsProps[];
}

///////////////
//// Pets ////
/////////////

export interface PetsProps {
    id: number;
    name: string;
    type: string;
    client_id: number;
    created_at: string;
    updated_at: string;
    client?: ClientsProps;
}

export interface PetCreateProps {
    name: string;
    type: string;
    client_id?: number;
}

export interface PetUpdateProps {
    id: number;
    name?: string;
    type?: string;
    client_id?: number;
    client?: ClientsProps;
}

export interface PetTableBodyProps {
    setSelectedPet: React.Dispatch<React.SetStateAction<PetsProps | null>>;
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
    pets: PetsProps[];
}



