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

//////////////////////
//// Schedulings ////
////////////////////

export interface SchedulingProps {
    id: number;
    status: string;
    client_id: number;
    pet_id: number;
    scheduled_at: string;
    created_at: string;
    updated_at: string;
    client?: ClientsProps;
    pet?: PetsProps;
}

export interface SchedulingCreateProps {
    client_id?: number;
    pet_id?: number;
    status?: string;
    scheduled_at: string;
}

export interface SchedulingUpdateProps {
    id: number;
    client_id?: number;
    pet_id?: number;
    status?: string;
    scheduled_at?: string;
    client?: ClientsProps;
    pet?: PetsProps;
}

export interface SchedulingTableBodyProps {
    setSelectedScheduling: React.Dispatch<React.SetStateAction<SchedulingProps | null>>;
    setOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenStatus: React.Dispatch<React.SetStateAction<boolean>>;
    schedulings: SchedulingProps[];
}