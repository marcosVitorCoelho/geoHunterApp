import { BaseInput } from "@components/BaseInput";
import { PrimaryButton } from "@components/PrimaryButton";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { colors } from "@configs/tailwindExportAttributes";
import { useContext } from "react";
import RegularUserContext from "../../../contexts/RegularUserContext";
import { LoginDataInterface, RegularUserInterface } from "src/interfaces/RegularUserInterface";
import { useNavigation } from "@react-navigation/native";

export default function LoginUserScreen() {

    const { updateUserLoginDataField, loginUser } = useContext(RegularUserContext)

    const navigation = useNavigation()

    function handleChangeField(newValue: string, field: keyof LoginDataInterface) {
        updateUserLoginDataField(field, newValue)
    }

    return (
        <View className="flex-1 flex bg-bgSecondary">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <SafeAreaView className="flex-1">
                    <View className="flex flex-1 flex-col p-4">
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                            <ScrollView className="flex flex-col">
                                <View className="mb-4">
                                    <Text className="text-center text-textColor font-subtitle text-base">Seja bem vindo de volta!</Text>
                                </View>
                                <BaseInput
                                    id="email"
                                    name="Email"
                                    placeholder="Email"
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'email')}
                                />
                                <BaseInput
                                    id="password"
                                    name="Password"
                                    placeholder="Password"
                                    secureTextEntry
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'password')}
                                />
                            </ScrollView>
                        </TouchableWithoutFeedback>
                    </View>
                </SafeAreaView>
                <View className="flex h-[235px] flex-col items-center justify-center self-stretch rounded-t-[20px] bg-bgComponent p-5">
                    <View className="flex flex-1 flex-col items-start gap-[10px] self-stretch pt-5">
                        <View className="flex flex-row items-center gap-[10px] self-stretch align-middle">
                            <Entypo name="add-user" size={24} color={colors.textColor} />
                            <Text className="flex-1 font-subtitle text-base leading-normal tracking-[-0.333px] text-textColor">
                                Login
                            </Text>
                        </View>
                        <Text className="font-body text-sm tracking-[-0.333px] text-textColor">
                            Bem vinde de volte!
                        </Text>
                    </View>
                    <PrimaryButton className="w-full" onPress={loginUser}>
                        Login
                    </PrimaryButton>
                    <TouchableOpacity className="mt-[5px] flex flex-shrink-0 items-center justify-center" onPress={() => navigation.navigate("RegisterRegularUserScreen")}>
                        <Text className="text-center text-sm font-bold text-textColor">
                            Cadastre-se
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}