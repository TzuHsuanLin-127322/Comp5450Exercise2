import { InboxModel } from '@/models/Inbox'
import { useState } from 'react'
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
        setApiState(ApiState.Loading)
        console.log('Fetch inbox')
        try{
            // setInbox(mockIndox)
            setApiState(ApiState.Success)
        } catch (error) {
            // setError(error.msg)
            setApiState(ApiState.Error)
        }
    }


    return({
        inbox, apiState, error
    })
}