import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface PrimaryButtonProps extends TouchableOpacityProps {
  [x: string]: any;
  children: React.ReactNode;
}

export function PrimaryButton({ children, ...rest }: PrimaryButtonProps) {
  return (
    <TouchableOpacity className="flex h-[40px] flex-shrink-0 items-center justify-center rounded-[5px] bg-primaryColor px-3 py-[6px]" {...rest}>
      <Text className="text-center font-body text-base text-baseColor">
        {children}
      </Text>
    </TouchableOpacity>
  )
}