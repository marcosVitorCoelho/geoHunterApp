import { AddressInterface } from "./RegularUserInterface";

export interface ProUserInterface {
    firstName: string;
    lastName: string;
    rg: string;
    cpf: string;
    phoneNumber: string;
    email: string;
    address: AddressProUserInterface;
    password?: string;
    birthDate: Date;
    type: string;
    role: string | RoleModel;
}

export interface AddressProUserInterface extends AddressInterface {
    longitude: number;
    latitude: number;
}

export interface ProUserInterfaceDataResponse {
    firstName: string;
    lastName: string;
    rg: string;
    cpf: string;
    phoneNumber: string;
    email: string;
    address: AddressProUserInterface;
    password?: string;
    birthDate: Date;
    type: string;
    role: RoleModel;
    distance: number;
}


interface RoleModel {
    _id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
    __v: number
}
