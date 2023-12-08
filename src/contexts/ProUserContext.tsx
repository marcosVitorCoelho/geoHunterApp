import { useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { apiBase } from "../services/api";
import { ProUserInterface, ProUserInterfaceDataResponse } from "..//interfaces/ProUserInterface";
import { Alert } from "react-native";

interface ProUserContextInterface {
    createProUser: () => void;
    updateUserStateField: (fieldToUpdate: keyof ProUserInterface, updatedValue: string, addressField?: string) => void;
    roles: DataResponseType[];
    handleReceiveProData: (data: ProUserInterfaceDataResponse[]) => void
    userProData: ProUserInterfaceDataResponse[];
}

export interface DataResponseType {
    __v: number
    _id: string
    createdAt: string
    description: string
    title: string
    updatedAt: string
}


interface LocationContextProviderProps {
    children: ReactNode
}

const ProUserContext = createContext({} as ProUserContextInterface)

function ProUserProvider({ children }: LocationContextProviderProps) {

    const [userProData, setUserProData] = useState<ProUserInterfaceDataResponse[]>([])

    function handleReceiveProData(data: ProUserInterfaceDataResponse[]) {
        setUserProData(data)
    }

    const [proUser, setProUser] = useState<ProUserInterface>({
        address: {
            city: '',
            number: '',
            state: '',
            street: '',
            zipCode: '',
            longitude: 0,
            latitude: 0
        },
        birthDate: new Date(),
        role: '',
        cpf: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phoneNumber: '',
        rg: '',
        type: 'regular'

    })

    const [proLocation, setProLocation] = useState<LocationObject | null>(null);

    const [roles, setRoles] = useState<DataResponseType[]>([]);

    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            setProLocation(currentPosition)
        }
    }

    useEffect(() => {
        if (!proLocation) requestLocationPermission()
        if (proLocation)
            setProUser((prevState) => ({
                ...prevState,
                address: { ...prevState.address, latitude: proLocation.coords.latitude, longitude: proLocation.coords.longitude }
            }));
    }, [proLocation])

    const updateUserStateField = (fieldToUpdate: keyof ProUserInterface, updatedValue: string, addressField?: string): void => {
        if (!addressField) {
            setProUser((prevState) => ({
                ...prevState,
                [fieldToUpdate]: updatedValue,
            }));
        } else {
            setProUser((prevState) => ({
                ...prevState,
                address: { ...prevState.address, [addressField]: updatedValue }
            }));
        }

        console.log(proUser)
    };

    async function getAllRoles() {
        try {
            const data = await apiBase.get<AxiosResponse>("/role")
            console.log(data.data)
            if (data.status === 200) {
                setRoles(data.data.data)
            }
        } catch (error) {
            Alert.alert(String(error))
            console.error(error);
        }
    }

    useEffect(() => { getAllRoles() }, [])


    const navigation = useNavigation();

    async function createProUser() {
        try {
            const data = await apiBase.post<AxiosResponse>("/prouser/registerProUser", proUser);
            if (data.status === 201) {
                Alert.alert("Perfil profissional criado com sucesso, aguarde em seu email ou WhatsApp pelo contato de um cliente!")
                navigation.navigate("SelectUserTypeScreen")
            }
        } catch (error) {
            Alert.alert(String(error))
            console.error(error);
        }
    };

    return (
        <ProUserContext.Provider
            value={{ createProUser, updateUserStateField, roles, handleReceiveProData, userProData }}
        >
            {children}
        </ProUserContext.Provider>
    )
}

export default ProUserContext;
export { ProUserProvider };