import { AxiosResponse } from "axios";
import { LocationObject } from "expo-location";
import { ReactNode, createContext, useRef, useState } from "react";
import { Alert } from "react-native";
import MapView from "react-native-maps";
import { ProUserInterface } from "src/interfaces/ProUserInterface";
import { apiBase } from "..//services/api";

interface LocationContextInterface {
    handleChangeLocation: (location: LocationObject) => void;
    mapRef: React.RefObject<MapView>
    location: LocationObject | null;
    handleChangeDistance: (newValue: number) => void;
    distance: number;
}

interface LocationContextProviderProps {
    children: ReactNode
}

const LocationContext = createContext({} as LocationContextInterface)

function LocationProvider({ children }: LocationContextProviderProps) {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [distance, setDistance] = useState<number>(0);
    const [allProUserByRole, setAllProUserByRole] = useState<ProUserInterface[]>([])

    const mapRef = useRef<MapView>(null)

    function handleChangeDistance(newValue: number) {
        console.log(newValue)
        setDistance(newValue)
    }


    function handleChangeLocation(location: LocationObject) {
        setLocation(location)
    }


    async function getAllProUsers() {
        try {
            const data = await apiBase.get<AxiosResponse>("/prouser")
            if (data.status === 200) {

            }
        } catch (error) {
            Alert.alert(String(error))
            console.error(error);
        }
    }


    return (
        <LocationContext.Provider
            value={{ handleChangeLocation, mapRef, location, handleChangeDistance, distance }}
        >
            {children}
        </LocationContext.Provider>
    )
}

export default LocationContext;
export { LocationProvider };