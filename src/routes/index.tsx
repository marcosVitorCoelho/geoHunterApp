import { NavigationContainer } from "@react-navigation/native"
//import { OnBoardingStackRoutes } from "./onboardingStackNavigationRoutes/onBoardingStack.routes";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"
import { View } from "react-native";
import { LocationProvider } from "../contexts/LocationContext";
import { OnBoarding } from "./onBoarding/onBoarding.routes";
import { RegularUserProvider } from "../contexts/RegularUserContext";
import { ProUserProvider } from "../contexts/ProUserContext";


export function Routes() {
    return (
        <View className="flex-1">
            <LocationProvider>
                <GluestackUIProvider config={config}>
                    <NavigationContainer>
                        <ProUserProvider>
                            <RegularUserProvider>
                                <OnBoarding />
                            </RegularUserProvider>
                        </ProUserProvider>
                    </NavigationContainer>
                </GluestackUIProvider>
            </LocationProvider>
        </View>
    );
}