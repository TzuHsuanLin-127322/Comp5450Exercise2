import { InboxModel } from '@/models/Inbox'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ApiState } from '../models/ApiState'

const mockIndox: InboxModel[] = [
    {
        inboxId: "str0235",
        inboxName: "Family",
        iconSymbol: "👨‍👩‍👦",
        iconColor: "#00ff00",
    }
]


export const useInboxViewModel = () => {
    const [inbox, setInbox] = useState<InboxModel[]>([]) // TODO: Define Inbox Model
    const [apiState, setApiState] = useState(ApiState.Initial) // TODO: Add API State
    const [error, setError] = useState(null) // TODO: Define error state
    const fetchInbox = async () => {
        console.log("fetchInbox")
        setApiState(ApiState.Loading)
        try{
            // setInbox(mockIndox)
            setApiState(ApiState.Success)
        } catch (error) {
            // setError(error.msg)
            setApiState(ApiState.Error)
        }
    }

    const addInbox = async (newInbox: InboxModel) => {
        setApiState(ApiState.Loading)
        newInbox.inboxId = uuidv4()
        console.log("addInbox", newInbox)

        try{
            setInbox([...inbox, newInbox])
            setApiState(ApiState.Success)
        } catch (error) {
            // setError(error.msg)
            setApiState(ApiState.Error)
        }
    }

    const editInbox = async (updatedInbox: InboxModel) => {
        console.log("editInbox", updatedInbox)
        setApiState(ApiState.Loading)
        try{
            setInbox(inbox.map(inbox => inbox.inboxId === updatedInbox.inboxId ? updatedInbox : inbox))
            setApiState(ApiState.Success)
        } catch (error) {
            // setError(error.msg)
            setApiState(ApiState.Error)
        }
    }

    useEffect(() => {
        fetchInbox()
    }, [])

    return({
        inbox, apiState, error, fetchInbox, addInbox, editInbox
    })
}
