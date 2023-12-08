import { TextInput, View, Text, TextInputProps } from "react-native";



interface BaseInputProps extends TextInputProps {
  name: string;
  id: string;
  placeholder?: string;
}

export function BaseInput({ name, id, placeholder, ...rest }: BaseInputProps) {


  return (
    <View className="flex py-0 px-[10px] flex-col items-start gap-[2px] self-stretch mb-[10px]">
      <Text className="flex items-start gap-[10px] self-stretch text-textColor font-body text-base">
        {name}
      </Text>
      <TextInput
        {...rest}
        id={id}
        placeholder={placeholder}
        className=" h-[44px] p-[10px] items-center gap-[10px] rounded-[10px] bg-bgComponent w-full m-12a text-textColor font-alt"
        placeholderTextColor={'#ccc'}
      />
    </View>
  )
}