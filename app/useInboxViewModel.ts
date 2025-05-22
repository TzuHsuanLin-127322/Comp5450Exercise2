import { InboxModel } from '@/models/Inbox'
import {
    addInbox as addInboxToService,
    deleteInbox as deleteInboxToService,
    fetchInbox as fetchInboxFromService,
    updateInbox as updateInboxToService
} from '@/models/mockData'
import { useEffect, useState } from 'react'
import { ApiState } from '../models/ApiState'

export const useInboxViewModel = () => {
    const [inbox, setInbox] = useState<InboxModel[]>([])
    const [apiState, setApiState] = useState(ApiState.Initial)
    const [error, setError] = useState(null)

    const fetchInbox = async () => {
        // console.log("fetchInbox")
        setApiState(ApiState.Loading)
        const result = await fetchInboxFromService()
        if (result) {
            setInbox(result)
            setApiState(ApiState.Success)
        } else {
            setApiState(ApiState.Error)
        }
    }

    const addInbox = async (newInbox: InboxModel) => {
        // console.log("addInbox", newInbox)
        setApiState(ApiState.Loading)
        const result = await addInboxToService(newInbox)
        if (result) {
            await fetchInbox()
        } else {
            setApiState(ApiState.Error)
        }
    }

    const editInbox = async (updatedInbox: InboxModel) => {
        // console.log("editInbox", updatedInbox)
        setApiState(ApiState.Loading)
        const result = await updateInboxToService(updatedInbox)
        if (result) {
            await fetchInbox()
        } else {
            // setError(error.msg)
            setApiState(ApiState.Error)
        }
    }

    const deleteInbox = async (inboxToBeDeleted: InboxModel) => {
        console.log("deleteInbox", inboxToBeDeleted.inboxId)
        setApiState(ApiState.Loading)
        const result = await deleteInboxToService(inboxToBeDeleted)
        if (result) {
            await fetchInbox()
        } else {
            setApiState(ApiState.Error)
        }
    }

    useEffect(() => {
        fetchInbox()
    }, [])

    return({
        apiState,
        error,
        inbox,
        fetchInbox,
        addInbox,
        editInbox,
        deleteInbox
    })
}
