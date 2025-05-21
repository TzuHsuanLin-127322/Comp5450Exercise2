import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { buttonCreateFABStyle } from "./commonStyle";

type CreateButtonProps = TouchableOpacityProps

const CreateButton: React.FC<CreateButtonProps> = (props) => {
    const {style, ...rest} = props
    return (
        <TouchableOpacity
            style={[buttonCreateFABStyle, style]}
            {...rest}
        >
            <Ionicons name="add" size={48} color="white"/>
        </TouchableOpacity>
    )
}

export default CreateButton