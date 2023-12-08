import { Text, View } from 'react-native';
import { useEffect, useContext } from 'react';
import MapView, { Marker, Circle } from 'react-native-maps'
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, LocationObject, watchPositionAsync, LocationAccuracy } from 'expo-location'
import LocationContext from '../../contexts/LocationContext';
import ProUserContext from '../../contexts/ProUserContext';
import { useNavigation } from '@react-navigation/native';


export default function MapViewComponent() {
    const { handleChangeLocation, mapRef, location, distance } = useContext(LocationContext)
    const { userProData } = useContext(ProUserContext)

    const navigation = useNavigation()

    async function requestLocationPermission() {
        const { granted } = await requestForegroundPermissionsAsync()

        if (granted) {
            const currentPosition = await getCurrentPositionAsync();
            handleChangeLocation(currentPosition)
        }
    }

    useEffect(() => {
        requestLocationPermission()
    }, [])

    useEffect(() => {
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 5000,
            distanceInterval: 1
        }, (response) => {
            handleChangeLocation(response)
            console.log(response)
            mapRef.current?.animateCamera({
                center: response.coords
            })
        })
    }, [])

    return (

        location ? (<View className='flex-1 bg-bgSecondary'>
            <MapView
                ref={mapRef}
                className='flex-1 w-full'
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
            >
                <Circle
                    radius={distance * 1000}
                    center={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                />
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                />

                {userProData && userProData.map((userPro, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: userPro.address.latitude,
                                longitude: userPro.address.longitude,
                            }}
                        />
                    )
                })}
            </MapView>
        </View>) : (<Text>OLÁ</Text>)

    )

}