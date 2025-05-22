import { InboxModel } from '@/models/Inbox'
import {
    addInbox as addInboxToService,
    deleteInbox as deleteInboxToService,
    fetchInboxList as fetchInboxListFromService,
    updateInbox as updateInboxToService
} from '@/models/mockData'
import { useEffect, useState } from 'react'
import { ApiState } from '../models/ApiState'

export const useInboxViewModel = () => {
    const [inbox, setInbox] = useState<InboxModel[]>([])
    const [apiState, setApiState] = useState(ApiState.Initial)
    const [error, setError] = useState(null)

    const fetchInboxList = async () => {
        // console.log("fetchInbox")
        setApiState(ApiState.Loading)
        const result = await fetchInboxListFromService()
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
            await fetchInboxList()
        } else {
            setApiState(ApiState.Error)
        }
    }

    const editInbox = async (updatedInbox: InboxModel) => {
        // console.log("editInbox", updatedInbox)
        setApiState(ApiState.Loading)
        const result = await updateInboxToService(updatedInbox)
        if (result) {
            await fetchInboxList()
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
            await fetchInboxList()
        } else {
            setApiState(ApiState.Error)
        }
    }

    useEffect(() => {
        fetchInboxList()
    }, [])

    return({
        apiState,
        error,
        inbox,
        fetchInbox: fetchInboxList,
        addInbox,
        editInbox,
        deleteInbox
    })
}
