import { InboxModel } from "@/models/Inbox";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import 'react-native-get-random-values';
import AddEditInboxModal from "./addEditInboxModal";
import BaseButton from "./components/baseButton";
import BaseModal from "./components/baseModal";
import CreateButton from "./components/createButton";
import InboxIcon from "./inboxIcon";
import { useInboxViewModel } from "./useInboxViewModel";

export default function Inbox() {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: "Inbox" })
  })

  const [isAddEditInboxModalVisible, setIsAddEditInboxModalVisible] = useState(false)
  const [isIndoxLongClickMenuVisible, setIsIndoxLongClickMenuVisible] = useState(false)
  const [isConfirmDeleteInboxModalVisible, setIsConfirmDeleteInboxModalVisible] = useState(false)
  const [selectedInbox, setSelectedInbox] = useState<InboxModel | null>(null)

  const {
    inbox,
    apiState,
    error,
    addInbox,
    fetchInbox,
    editInbox,
    deleteInbox
  } = useInboxViewModel()

  if (error) {
    // TODO: Return error display
  }

  const onCreateInboxPress = () => {
    console.log("onCreateInboxPress")
    setIsAddEditInboxModalVisible(true)
  }

  const onAddEditInboxClose = () => {
    setIsAddEditInboxModalVisible(false)
    setSelectedInbox(null)
  }

  const onInboxPress = (inbox: InboxModel) => {
    console.log("onInboxPress", inbox)
  }

  const onInboxLongPress = (inbox: InboxModel) => {
    setIsIndoxLongClickMenuVisible(true)
    setSelectedInbox(inbox)
  }

  const onEditInboxPress = () => {
    setIsIndoxLongClickMenuVisible(false)
    setIsAddEditInboxModalVisible(true)
  }

  const onConfirmDeleteInboxPress = () => {
    setIsConfirmDeleteInboxModalVisible(false)
    setIsIndoxLongClickMenuVisible(false)
    if (selectedInbox) {
      deleteInbox(selectedInbox)
      setSelectedInbox(null)
    }
  }

  const onCancelDeleteInboxPress = () => {
  }

  const onLongClickMenuClose = () => {
    setIsIndoxLongClickMenuVisible(false)
    setSelectedInbox(null)
  }

  const onAddEditInboxSavePressed = (newInbox: InboxModel) => {
    if (!newInbox.inboxId) {
      addInbox(newInbox)
    } else {
      editInbox(newInbox)
    }
    onAddEditInboxClose()
  }

  const content = inbox.length == 0 ?
    (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16
        }}
      >
        <Text>No inbox available, let's create one!</Text>
        <BaseButton
          style={{ marginTop: 8 }}
          title="Create Inbox"
          onPress={onCreateInboxPress}
          icon={<Ionicons name="add" color={'white'} size={16} />}
        />
      </View>
    ) : (
      <FlatList
        data={inbox.length % 2 == 0 ? inbox : [...inbox, null]}
        numColumns={2}
        ListFooterComponent={<View style={{ height: 100 }} />}
        renderItem={({ item }) => {
          if (item == null) {
            return (
              <View style={{ flex: 1, margin: 8, padding: 8 }} />
            )
          }
          return (
            <TouchableOpacity
              onPress={() => onInboxPress(item)}
              onLongPress={() => onInboxLongPress(item)}
              style={{ padding: 8, borderWidth: 1, borderColor: 'gray', borderRadius: 8, margin: 8, backgroundColor: 'white', flex: 1 }}
            >
              <InboxIcon
                iconColor={item.iconColor}
                iconSymbol={item.iconSymbol}
                inboxName={item.inboxName}
              />
            </TouchableOpacity>
          )
        }}
      />
    )

  const addEditModal = (
    <AddEditInboxModal
      initialInbox={selectedInbox}
      onClosePressed={onAddEditInboxClose}
      onSavePressed={onAddEditInboxSavePressed}
      visible={isAddEditInboxModalVisible}
    />
  )

  const longClickMenu = (
    <BaseModal
      visible={isIndoxLongClickMenuVisible} style={{ width: '80%' }}
      onRequestClose={onLongClickMenuClose}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Selected Inbox: {selectedInbox?.inboxName}</Text>
        <TouchableOpacity
          style={{ margin: 16 }}
          onPress={onEditInboxPress}
        >
          <Text style={{ fontSize: 14}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 16 }}
          onPress={() => setIsConfirmDeleteInboxModalVisible(true)}
        >
          <Text style={{ fontSize: 14}}>Delete</Text>
        </TouchableOpacity>
    </BaseModal>
  )

  const confirmDeleteModal = (
    <BaseModal
      visible={isConfirmDeleteInboxModalVisible}
      onRequestClose={() => setIsConfirmDeleteInboxModalVisible(false)}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Confirm Delete Inbox</Text>
      <Text style={{ marginVertical: 16 }}>Are you sure you want to delete inbox {selectedInbox?.inboxName}? You will lose all data associated with it.</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <BaseButton
          title="Delete"
          style={{ backgroundColor: 'transparent'}}
          textStyle={{color: 'orange'}}
          onPress={onConfirmDeleteInboxPress}
        />
        <BaseButton
          title="Cancel"
          style={{ backgroundColor: 'transparent'}}
          textStyle={{color: 'orange'}}
          onPress={() => setIsConfirmDeleteInboxModalVisible(false)}
        />
      </View>
      
    </BaseModal>
  )

  return (
    <View style={{ flex: 1, }}>
      {content}
      <CreateButton onPress={onCreateInboxPress} />
      {addEditModal}
      {longClickMenu}
      {confirmDeleteModal}
    </View>
  );
}

