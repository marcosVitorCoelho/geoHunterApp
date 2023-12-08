import { useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import { LocationObject } from "expo-location";
import { ReactNode, createContext, useState } from "react";
import { LoginDataInterface, RegularUserInterface } from "src/interfaces/RegularUserInterface";
import { apiBase } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SessionConstants from "@constants/SessionConstants";

interface RegularUserContextInterface {
    createUser: () => void;
    loginUser: () => void;
    updateUserStateField: (fieldToUpdate: keyof RegularUserInterface, updatedValue: string, addressField?: string) => void;
    updateUserLoginDataField: (fieldToUpdate: keyof LoginDataInterface, updatedValue: string) => void
}

interface RegularUserContextProviderProps {
    children: ReactNode
}

const RegularUserContext = createContext({} as RegularUserContextInterface)

function RegularUserProvider({ children }: RegularUserContextProviderProps) {

    const [loginData, setLoginData] = useState<LoginDataInterface>({
        email: '',
        password: ''
    })
    const [user, setUser] = useState<RegularUserInterface>({
        address: {
            city: '',
            number: '',
            state: '',
            street: '',
            zipCode: ''
        },
        birthDate: new Date(),
        cpf: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phoneNumber: '',
        rg: '',
        type: 'regular'

    })

    const updateUserLoginDataField = (fieldToUpdate: keyof LoginDataInterface, updatedValue: string) => {
        setLoginData((prevState) => ({
            ...prevState,
            [fieldToUpdate]: updatedValue
        }))
    }

    const updateUserStateField = (fieldToUpdate: keyof RegularUserInterface, updatedValue: string, addressField?: string): void => {
        if (!addressField) {
            setUser((prevState) => ({
                ...prevState,
                [fieldToUpdate]: updatedValue,
            }));
        } else {
            setUser((prevState) => ({
                ...prevState,
                address: { ...prevState.address, [addressField]: updatedValue }
            }));
        }
    };

    const navigation = useNavigation();

    async function createUser() {
        try {
            const data = await apiBase.post<AxiosResponse>("/regularuser/registerRegularUser", user);
            if (data.status === 201) {
                alert("Usuário criado")
                navigation.navigate("LoginScreen")
            }
        } catch (error) {
            alert(error)
            console.error(error);
        }
    };

    async function loginUser() {
        try {
            const data = await apiBase.post<AxiosResponse>("/regularuser/loginregularuser", loginData);
            if (data.status === 200) {
                await AsyncStorage.setItem(SessionConstants.ACCESS_TOKEN_COOKIE_KEY, data.data.data.token)
                navigation.navigate("HomeTabs")
            }
        } catch (error) {
            alert(error)
            console.error(error);
        }
    };


    return (
        <RegularUserContext.Provider
            value={{ createUser, updateUserStateField, updateUserLoginDataField, loginUser }}
        >
            {children}
        </RegularUserContext.Provider>
    )
}

export default RegularUserContext;
export { RegularUserProvider };