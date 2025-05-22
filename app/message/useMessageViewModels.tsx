import { ApiState } from "@/models/ApiState"
import { MessageModel } from "@/models/Message"
import { addMessage as addMessageToService, deleteMessage as deleteMessageToService, fetchMessageList as fetchMessageListFromService, updateMessage as updateMessageToService } from "@/models/mockData"
import { useEffect, useState } from "react"

export const useMessageViewModel = (inboxId: string) => {
    const [apiState, setApiState] = useState(ApiState.Initial)
    const [messages, setMessages] = useState<MessageModel[]>([])
    const [error, setError] = useState(null)

    const fetchMessages = async (inboxId: string) => {
        setApiState(ApiState.Loading)
        const result = await fetchMessageListFromService(inboxId)
        if (result) {
            setMessages(result)
            setApiState(ApiState.Success)
        } else {
            setApiState(ApiState.Error)
        }
    }

    const createMessage = async (message: MessageModel) => {
        setApiState(ApiState.Loading)
        const result = await addMessageToService(message)
        if (result) {
            await fetchMessages(inboxId)
        } else {
            setApiState(ApiState.Error)
        }
    }

    const updateMessage = async (message: MessageModel) => {
        setApiState(ApiState.Loading)
        const result = await updateMessageToService(message)
        if (result) {
            await fetchMessages(inboxId)
        } else {
            setApiState(ApiState.Error)
        }
    }

    const deleteMessage = async (message: MessageModel) => {
        setApiState(ApiState.Loading)
        const result = await deleteMessageToService(message)
        if (result) {
            await fetchMessages(inboxId)
        } else {
            setApiState(ApiState.Error)
        }
    }

    useEffect(() => {
        fetchMessages(inboxId)
    }, [inboxId])

    return {
        messages,
        apiState,
        error,
        fetchMessages,
        createMessage,
        updateMessage,
        deleteMessage
    }
}
