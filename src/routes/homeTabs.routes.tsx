import MapViewComponent from "@components/MapView";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Fontisto } from '@expo/vector-icons';
import { colors, fontFamily } from "@configs/tailwindExportAttributes";
import { Text, View } from "react-native";
import ProUserList from "@screens/proUserList";


export type TabParamList = {
    Mapa: undefined;
    List: undefined;
}


const { Screen, Navigator } = createBottomTabNavigator<TabParamList>()

export function HomeTabRoutes() {

    return (
        <Navigator
            screenOptions={({ route }) => ({
                unmountOnBlur: true,
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.bgComponent,
                    borderTopColor: 'transparent',
                    height: 70,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: colors.sucessColor,
                tabBarInactiveTintColor: colors.bgComponent,
            })}

        >
            <Screen
                name="Mapa"
                component={MapViewComponent}
                options={{
                    tabBarLabel: '',
                    tabBarLabelStyle: {
                        fontFamily: fontFamily.title,
                    },
                    tabBarIcon: ({ color }) => (
                        <View className="flex w-[76px] h-[76px] flex-col items-center justify-center rounded-full border-[4px] border-bgComponent bg-primaryColor mb-[5px]">
                            <Fontisto name="map" size={24} color={color} />
                            <Text className="text-center font-title text-[11px] text-bgComponent">Mapa</Text>
                        </View>

                    )
                }}
            />
            <Screen
                name="List"
                component={ProUserList}
                options={{
                    tabBarLabel: '',
                    tabBarLabelStyle: {
                        fontFamily: fontFamily.title,
                    },
                    tabBarIcon: ({ color }) => (
                        <View className="flex w-[76px] h-[76px] flex-col items-center justify-center rounded-full border-[4px] border-bgComponent bg-primaryColor mb-[5px]">
                            <Fontisto name="list-2" size={24} color={color} />
                            <Text className="text-center font-title text-[11px] text-bgComponent">Lista</Text>
                        </View>

                    )
                }}
            />
        </Navigator>
    )
}