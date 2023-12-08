import MapViewComponent from "@components/MapView";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeTabRoutes } from "@routes/homeTabs.routes";
import SelectUserType from "@screens/selectUserType";
import LoginUserScreen from "@screens/onBoardingRegularUser/Login";
import CreateRegularUserScreen from "@screens/onBoardingRegularUser/Register";
import CreateProUserScreen from "@screens/onBoardingProUser";


export type OnboardingStackParamList = {
    RegisterRegularUserScreen: undefined;
    RegisterProUser: undefined;
    HomeTabs: undefined;
    LoginScreen: undefined;
    SelectUserTypeScreen: undefined;
}


const { Screen, Navigator } = createNativeStackNavigator<OnboardingStackParamList>()

export function OnBoarding() {

    return (
        <Navigator
            screenOptions={{ headerShown: false, }}
        >
            <Screen
                name="SelectUserTypeScreen"
                component={SelectUserType}
            />
            <Screen
                name="RegisterRegularUserScreen"
                component={CreateRegularUserScreen}
            />
            <Screen
                name="HomeTabs"
                component={HomeTabRoutes}
            />
            <Screen
                name="LoginScreen"
                component={LoginUserScreen}
            />
            <Screen
                name="RegisterProUser"
                component={CreateProUserScreen}
            />
        </Navigator>
    )
}