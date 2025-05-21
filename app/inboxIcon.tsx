import { Text, TextStyle, View, ViewProps } from "react-native";
import { centered } from "./components/commonStyle";

type InboxIconProps = ViewProps & {
  iconColor: string,
  iconStyle?: TextStyle,
  iconSymbol: string,
  inboxName: string,
  inboxNameStyle?: TextStyle,
}

const InboxIcon: React.FC<InboxIconProps> = (props: InboxIconProps) => {
    const { style, iconColor, iconSymbol, iconStyle, inboxName, inboxNameStyle, ...others } = props

    return (
        <View style={[centered, style]} {...others}>
            <View style={[centered,{aspectRatio: 1, backgroundColor: iconColor, borderRadius: '50%', padding: '12%', elevation: 4}]}>
                <Text style={[{fontSize: 50, }, iconStyle]}>{iconSymbol}</Text>
            </View>
            <Text style={[{fontSize: 24, fontWeight: 'bold', marginTop: 8}, inboxNameStyle]}>{inboxName}</Text>
        </View>
    )
}

export default InboxIcon
