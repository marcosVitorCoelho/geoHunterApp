import { ActivityIndicator, View } from 'react-native'

export function Loading() {
    return (
        <View className="flex-1 items-center justify-center bg-bgColor">
            <ActivityIndicator color="yellow" />
        </View>
    )
}
