import { Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { buttonBaseStyle, buttonDisabledStyle } from "./commonStyle";

type BaseButtonProps = TouchableOpacityProps & {
    title: string,
    icon?: React.ReactNode,
    textStyle?: TextStyle
}

const BaseButton: React.FC<BaseButtonProps> = (props: BaseButtonProps) => {
    const {style, title, icon, disabled, textStyle, ...others} = props
    return (
        <TouchableOpacity {...others} style={[buttonBaseStyle, style, disabled ? buttonDisabledStyle : {}]}>
            {icon}
            <Text style={[{color: 'white', marginLeft: icon ? 8 : 0}, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default BaseButton