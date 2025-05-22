import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useMessageViewModel } from "./useMessageViewModels";

export default function Message() {
    const { title, inboxId, iconColor, iconSymbol } = useLocalSearchParams();

    const {
        messages,
        apiState,
        error,
        fetchMessages,
        createMessage,
        updateMessage,
        deleteMessage
    } = useMessageViewModel(inboxId as string)
    return (
        <View>
            <Text>Message</Text>
            {messages.map((item) => <Text>{item.message}</Text>)}
        </View>
    );
}