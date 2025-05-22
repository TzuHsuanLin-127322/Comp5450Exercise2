import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Message() {
    const { title, inboxId, iconColor, iconSymbol } = useLocalSearchParams();
    return (
        <View>
            <Text>Message</Text>
        </View>
    );
}