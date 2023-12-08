import { PrimaryButton } from "@components/PrimaryButton";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { colors } from "@configs/tailwindExportAttributes";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { SecondaryButton } from "@components/SecondaryButton";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SessionConstants from "@constants/SessionConstants";

export default function SelectUserType() {
    const navigation = useNavigation()

    async function verifyUserLogged() {
        const token = await AsyncStorage.getItem(SessionConstants.ACCESS_TOKEN_COOKIE_KEY);

        if (token) {
            navigation.navigate("HomeTabs")
        }
    }

    useEffect(() => {
        verifyUserLogged()
    }, [])

    return (
        <View className="flex-1 flex bg-bgSecondary">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <SafeAreaView className="flex-1">
                    <View className="flex flex-1 flex-col p-4">
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View className="flex flex-1 flex-col items-center justify-center">
                                <View className="mb-4">
                                    <Text className="text-center text-textColor font-subtitle text-base">Qual usuário você quer ser?</Text>
                                </View>
                                <PrimaryButton className="w-full mb-4" onPress={() => navigation.navigate("RegisterRegularUserScreen")}>
                                    Usuário regular
                                </PrimaryButton>
                                <SecondaryButton className="w-full mb-4"
                                    onPress={() => navigation.navigate("RegisterProUser")}>
                                    Usuário profissional
                                </SecondaryButton>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </SafeAreaView>
                <View className="flex h-[235px] flex-col items-center justify-center self-stretch rounded-t-[20px] bg-bgComponent p-5">
                    <View className="flex flex-1 flex-col items-start gap-[10px] self-stretch pt-5">
                        <View className="flex flex-row items-center gap-[10px] self-stretch align-middle">
                            <Ionicons name="settings-sharp" size={24} color={colors.textColor} />
                            <Text className="flex-1 font-subtitle text-base leading-normal tracking-[-0.333px] text-textColor">
                                Selecione seu tipo de usuário ou faça login.
                            </Text>
                        </View>
                    </View>
                    <PrimaryButton className="w-full" onPress={() => navigation.navigate("LoginScreen")}>
                        Já sou usuário
                    </PrimaryButton>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}