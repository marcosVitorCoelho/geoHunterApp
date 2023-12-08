import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView, Text, View } from "react-native";
import { colors } from "@configs/tailwindExportAttributes";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from '@expo/vector-icons';
import ProUserContext, { DataResponseType } from "../../contexts/ProUserContext";
import { Divider } from "@gluestack-ui/themed";
import LocationContext from "../../contexts/LocationContext";
import { apiBase } from "../../services/api";
import { AxiosResponse } from "axios";
import { ProUserInterface, ProUserInterfaceDataResponse } from "src/interfaces/ProUserInterface";
import { Loading } from "@components/Loading";
import { WebView } from 'react-native-webview';
import { BaseInput } from "@components/BaseInput";
import { PrimaryButton } from "@components/PrimaryButton";

export default function ProUserList() {
    const { location, distance, handleChangeDistance } = useContext(LocationContext)
    const { roles, handleReceiveProData } = useContext(ProUserContext)

    const [isFocus, setIsFocus] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [role, setRole] = useState<DataResponseType>();
    const [proUsersListData, setProUsersListData] = useState<ProUserInterfaceDataResponse[]>([])

    async function getAllProUsersByRole() {
        try {
            if (!role) {
                Alert.alert("Selecione uma categoria!")
            }
            if (location && role) {
                const { data, status } = await apiBase.get<AxiosResponse>("/getDistance", {
                    params: {
                        role: role._id,
                        distance: distance,
                        userLatitude: location.coords.latitude,
                        userLongitude: location.coords.longitude
                    }
                })
                if (status === 200) {
                    setProUsersListData(data.data)
                    handleReceiveProData(data.data)
                    setIsLoading(false)

                    return
                }
            }
        } catch (error) {
            Alert.alert(String(error))
        }
    }

    function openWebViewWppUrl(phone: string) {
        return (
            <WebView
                source={{ uri: `https://wa.me/${phone}` }}
                style={{ marginTop: 20 }}
            />
        )
    }

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

    return (
        <View className="flex-1 flex bg-bgSecondary">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <SafeAreaView className="flex-1">
                    <View className="flex flex-1 flex-col p-4">
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                            <View className="flex flex-col">
                                <View className="mb-4">
                                    <Text className="text-center text-textColor font-subtitle text-base">Escolha qual categoria de profissionais você precisa e a distancia máxima em Km entre você e eles!</Text>
                                </View>
                                <BaseInput
                                    id="distance"
                                    keyboardType="number-pad"
                                    name="Distancia"
                                    onChangeText={(newValue) => handleChangeDistance(Number(newValue))}
                                />
                                <Text className="text-center text-textColor font-subtitle text-base mb-2">Selecione a categoria</Text>
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
                                    placeholder={!isFocus ? 'Procurar' : '...'}
                                    searchPlaceholder="Buscar"
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={newValue => {
                                        setRole(newValue)
                                        setIsFocus(false);
                                    }}
                                    renderLeftIcon={() => (
                                        <MaterialIcons name="work-outline" size={20} style={styles.icon} color={isFocus ? colors.primaryColor : colors.textColor} />

                                    )}
                                />
                                <PrimaryButton
                                    className="mb-8"
                                    onPress={() => getAllProUsersByRole()}
                                >Buscar</PrimaryButton>
                                <Divider />
                                {isLoading ? <Loading /> : <FlatList
                                    data={proUsersListData}
                                    ItemSeparatorComponent={Divider}
                                    keyExtractor={(item) => item.cpf}
                                    renderItem={({ item }) =>
                                        <View
                                            className="flex h-auto p-4 flex-1 flex-col items-center justify-center rounded-[10px] bg-bgComponent mt-8 mb-8"
                                        >
                                            <MaterialIcons name="person" size={32} color={colors.textColor} />
                                            <Text className="font-body text-lg text-textColor">
                                                {item.firstName}
                                            </Text>
                                            <View className="flex flex-row items-center">
                                                <Text className="font-body text-[16px] text-textColor">
                                                    {item.role.title} há {item.distance.toFixed(2)}Km de distancia
                                                </Text>
                                            </View>
                                            <View className="flex-row justify-evenly w-full">
                                                <TouchableOpacity
                                                    onPress={
                                                        () => Linking.canOpenURL(`https://wa.me/55${item.phoneNumber}?text=Olá, preciso da sua ajuda!`).then((supported) => {
                                                            if (supported) {
                                                                return Linking.openURL(`https://wa.me/55${item.phoneNumber}?text=Olá, preciso da sua ajuda!`)
                                                            } else {
                                                                return Linking.openURL(
                                                                    `https://api.whatsapp.com/send?phone=${item.phoneNumber}&text=Olá, preciso da sua ajuda!`
                                                                );
                                                            }
                                                        }
                                                        )}
                                                    className="flex items-center justify-center"
                                                >
                                                    <MaterialIcons name="phone" size={32} color={colors.primaryColor} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    className="flex items-center justify-center"
                                                    onPress={() => {
                                                        Linking.openURL(
                                                            `mailto:${item.email}?subject=geohunter&body=ola`
                                                        );
                                                    }}>
                                                    <MaterialIcons name="email" size={32} color={colors.primaryColor} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                />}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </SafeAreaView >
            </KeyboardAvoidingView >
        </View >
    )
}