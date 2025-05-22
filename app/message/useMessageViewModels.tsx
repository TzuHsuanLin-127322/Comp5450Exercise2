import { ApiState } from "@/models/ApiState"
import { MessageModel } from "@/models/Message"
import { useState } from "react"

export const useMessageViewModel = (inboxId: string) => {
    const [apiState, setApiState] = useState(ApiState.Initial)
    const [messages, setMessages] = useState<MessageModel[]>([])
    const [error, setError] = useState(null)

    const fetchMessages = async (inboxId: string) => {}

    const createMessage = async (message: MessageModel) => {}

    const updateMessage = async (message: MessageModel) => {}

    const deleteMessage = async (message: MessageModel) => {}

    return {
        messages,
        apiState,
        error,
        fetchMessages,
        createMessage,
    }
}
