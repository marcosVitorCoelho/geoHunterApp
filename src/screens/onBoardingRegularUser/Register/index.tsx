import { BaseInput } from "@components/BaseInput";
import { PrimaryButton } from "@components/PrimaryButton";
import { Keyboard, KeyboardAvoidingView, NativeSyntheticEvent, Platform, ScrollView, TextInputChangeEventData, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { colors } from "@configs/tailwindExportAttributes";
import { useContext } from "react";
import RegularUserContext from "../../../contexts/RegularUserContext";
import { RegularUserInterface, AddressInterface } from "src/interfaces/RegularUserInterface";
import { useNavigation } from "@react-navigation/native";

export default function CreateRegularUserScreen() {

    const { createUser, updateUserStateField } = useContext(RegularUserContext)

    function handleChangeField(newValue: string, field: keyof RegularUserInterface, addressField?: string) {
        updateUserStateField(field, newValue, addressField)
    }

    const navigation = useNavigation();

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
                                    <Text className="text-center text-textColor font-subtitle text-base">Cadastre-se para encontrar soluções para seus problemas</Text>
                                </View>
                                <BaseInput
                                    id="first-name"
                                    name="Primeiro nome"
                                    placeholder="Primeiro nome"
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'firstName')}
                                />
                                <BaseInput
                                    id="last-name"
                                    name="Sobrenome"
                                    placeholder="Sobrenome"
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'lastName')}
                                />
                                <BaseInput
                                    id="email"
                                    name="Email"
                                    placeholder="Insira o nome que gostaria de ser chamado"
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'email')}
                                />
                                <BaseInput
                                    id="birthday"
                                    name="Aniverśario"
                                    placeholder="Aniversário"
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'birthDate')}
                                />
                                <BaseInput
                                    id="phone"
                                    name="Telefone"
                                    placeholder="Telefone"
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'phoneNumber')}
                                    keyboardType="number-pad"
                                />
                                <BaseInput
                                    id="rg"
                                    name="RG"
                                    placeholder="RG"
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'rg')}
                                    keyboardType="number-pad"
                                />
                                <BaseInput
                                    id="CPF"
                                    name="CPF"
                                    placeholder="CPF"
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'cpf')}
                                    keyboardType="number-pad"
                                />
                                <Text className="text-center text-textColor font-subtitle text-base">Endereço</Text>
                                <View className="flex-row">
                                    <BaseInput
                                        id="CEP"
                                        name="CEP"
                                        placeholder="CEP"
                                        onChangeText={(newValue: string) => handleChangeField(newValue, 'address', 'zipCode')}
                                        keyboardType="number-pad"
                                        className="w-[265px]"
                                    />
                                    <BaseInput
                                        id="number"
                                        name="Número"
                                        placeholder="Número"
                                        onChangeText={(newValue: string) => handleChangeField(newValue, 'address', 'number')}
                                        keyboardType="number-pad"
                                    />
                                </View>
                                <View className="flex-row">
                                    <BaseInput
                                        id="city"
                                        name="Cidade"
                                        placeholder="Cidade"
                                        onChangeText={(newValue: string) => handleChangeField(newValue, 'address', 'city')}
                                        className="w-[270px]"
                                    />
                                    <BaseInput
                                        id="state"
                                        name="Estado"
                                        placeholder="Estado"
                                        onChangeText={(newValue: string) => handleChangeField(newValue, 'address', 'state')}
                                    />
                                </View>
                                <BaseInput
                                    id="street"
                                    name="Rua"
                                    placeholder="Rua"
                                    onChangeText={(newValue: string) => handleChangeField(newValue, 'address', 'street')}
                                />
                                <BaseInput
                                    id="password"
                                    name="Senha"
                                    placeholder="Senha"
                                    passwordRules={"password"}
                                    secureTextEntry={true}
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
                                Cadastre-se
                            </Text>
                        </View>
                        <Text className="font-body text-sm tracking-[-0.333px] text-textColor">
                            Comece sua jornada em poucos passos. Vamos começar!
                        </Text>
                    </View>
                    <PrimaryButton className="w-full" onPress={createUser}>
                        Cadastrar
                    </PrimaryButton>
                    <TouchableOpacity className="mt-[5px] flex flex-shrink-0 items-center justify-center" onPress={() => navigation.navigate("LoginScreen")}>
                        <Text className="text-center text-sm font-bold text-textColor">
                            Já sou usuário
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}