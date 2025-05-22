import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { InboxModel } from "./Inbox";
import { MessageModel } from "./Message";


export const mockInbox: InboxModel[] = [
    {
        inboxId: "str0235",
        inboxName: "Family",
        iconSymbol: "👨‍👩‍👦",
        iconColor: "#00ff00",
    }
]

export const mockMessages: MessageModel[] = []

export const fetchInbox = async (): Promise<InboxModel[]> => {
    return mockInbox;
}

export const addInbox = async (newInbox: InboxModel): Promise<boolean> => {
    newInbox.inboxId = uuidv4()
    mockInbox.push(newInbox)
    return true;
}

export const updateInbox = async (inbox: InboxModel): Promise<boolean> => {
    const index = mockInbox.findIndex(i => i.inboxId === inbox.inboxId)
    if (index !== -1) {
        mockInbox[index] = inbox
        return true
    }
    return false
}

export const deleteInbox = async (inbox: InboxModel): Promise<boolean> => {
    const index = mockInbox.findIndex(i => i.inboxId === inbox.inboxId)
    if (index !== -1) {
        mockInbox.splice(index, 1)
        return true
    }
    return false
}

