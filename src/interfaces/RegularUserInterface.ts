export interface RegularUserInterface {
    firstName: string;
    lastName: string;
    rg: string;
    cpf: string;
    phoneNumber: string;
    email: string;
    address: AddressInterface;
    password: string;
    birthDate: Date;
    type: string;
}

export interface AddressInterface {
    street: string;
    city: string;
    state: string;
    number: string;
    zipCode: string;
}

export interface LoginDataInterface {
    email: string;
    password: string;
}