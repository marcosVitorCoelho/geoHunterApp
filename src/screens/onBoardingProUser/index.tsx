import { BaseInput } from "@components/BaseInput";
import { PrimaryButton } from "@components/PrimaryButton";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { Entypo } from '@expo/vector-icons'
import { colors } from "@configs/tailwindExportAttributes";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ProUserContext from "../../contexts/ProUserContext";
import { ProUserInterface } from "../../interfaces/ProUserInterface"
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialIcons } from '@expo/vector-icons';



export default function CreateProUserScreen() {



    const { createProUser, updateUserStateField, roles } = useContext(ProUserContext)

    function handleChangeField(newValue: string, field: keyof ProUserInterface, addressField?: string) {
        updateUserStateField(field, newValue, addressField)
    }

    const [isFocus, setIsFocus] = useState(false);

    const styles = StyleSheet.create({
        dropdown: {
            height: 50,
            borderColor: colors.textColor,
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginBottom: 20,
        },
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            backgroundColor: 'white',
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
            color: colors.textColor
        },
        placeholderStyle: {
            fontSize: 16,
            color: colors.textColor
        },
        selectedTextStyle: {
            fontSize: 16,
            color: isFocus ? colors.primaryColor : colors.textColor
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },
    });

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
                                    <Text className="text-center text-textColor font-subtitle text-base">Torne-se disponível para ser a solução de problemas!</Text>
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
                                <Text className="text-center text-textColor font-subtitle text-base mb-2">Seleciona a sua categoria</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: colors.primaryColor }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={roles}
                                    search
                                    maxHeight={300}
                                    labelField="title"
                                    valueField="_id"
                                    placeholder={!isFocus ? 'Selecione a sua categoria' : '...'}
                                    searchPlaceholder="Buscar"
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={newValue => {
                                        handleChangeField(newValue._id, 'role')
                                        setIsFocus(false);
                                    }}
                                    renderLeftIcon={() => (
                                        <MaterialIcons name="work-outline" size={20} style={styles.icon} color={isFocus ? colors.primaryColor : colors.textColor} />

                                    )}
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
                    <PrimaryButton className="w-full" onPress={createProUser}>
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
