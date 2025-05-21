import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { buttonBaseStyle } from "./commonStyle";

type BaseButtonProps = TouchableOpacityProps & {
    title: string,
    icon?: React.ReactNode
}

const BaseButton: React.FC<BaseButtonProps> = (props: BaseButtonProps) => {
    const {style, title, icon, ...others} = props
    return (
        <TouchableOpacity {...others} style={[buttonBaseStyle, style]}>
            {icon}
            <Text style={{color: 'white', marginLeft: icon ? 8 : 0}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default BaseButton