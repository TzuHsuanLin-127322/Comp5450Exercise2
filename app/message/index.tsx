import { MessageModel } from "@/models/Message";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import BaseButton from "../components/baseButton";
import BaseModal from "../components/baseModal";
import { useMessageViewModel } from "./useMessageViewModels";

export default function Message() {
  const { title, inboxId, iconColor, iconSymbol } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false)
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [isConfirmDeleteModalVisible, setIsConfirmDeleteModalVisible] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState<MessageModel | null>(null)
  const messageListRef = useRef<FlatList<MessageModel>>(null);

  // Set navigation options once
  useEffect(() => {
    navigation.setOptions({
      title: title as string,
      headerLeft: () => {
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ backgroundColor: iconColor as string, borderRadius: 100, padding: 4, marginHorizontal: 8 }}><Text style={{ fontSize: 16, color: "white" }}>{iconSymbol}</Text></View>
          </View>
        )
      }
    })
  })

  // Listen to native keyboard event
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      console.log("keyboardDidShow");
      setIsKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      console.log("keyboardDidHide");
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove(); 
    };
  }, []);

  // scroll to bottom when message is updated
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollToEnd({ animated: true });
    }
  }, [message])

  const {
    messages,
    apiState,
    error,
    fetchMessages,
    createMessage,
    updateMessage,
    deleteMessage
  } = useMessageViewModel(inboxId as string)

  const sendMessage = () => {
    if (isInEditMode && selectedMessage) {
      updateMessage({
        messageId: selectedMessage?.messageId,
        message: message,
        messageTime: selectedMessage?.messageTime,
        inboxId: selectedMessage?.inboxId
      })
    } else {
      createMessage(message);
    }
    setMessage("");
    setIsInEditMode(false);
  }

  const onMessageLongPress = (message: MessageModel) => {
    console.log("onMessageLongPress", message);
    setSelectedMessage(message);
    setIsOptionsModalVisible(true);
  }

  const onOptionsModalEditSelected = () => {
    setIsInEditMode(true)
    setMessage(selectedMessage?.message || "")
    setIsOptionsModalVisible(false)
  }

  const onOptionsModalDeleteSelected = () => {
    setIsConfirmDeleteModalVisible(true);
  }

  const closeOptionsModal = () => {
    setIsOptionsModalVisible(false);
    setSelectedMessage(null);
  }

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteModalVisible(false);
  }

  const onConfirmDeleteModalConfirm = () => {
    setIsConfirmDeleteModalVisible(false);
    setIsOptionsModalVisible(false);
    if (selectedMessage) {
      deleteMessage(selectedMessage);
      setSelectedMessage(null);
    }
  }

  const messageContent = messages.length == 0 ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No messages</Text>
    </View>
  ) : (
    <FlatList
      ref={messageListRef}
      style={{paddingHorizontal: 16}}
      data={messages}
      renderItem={({ item }) => {return (
        <TouchableOpacity onLongPress={() => onMessageLongPress(item)}>
          <View 
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 16,
              padding: 8,
              backgroundColor: "white",
              marginVertical: 8
            }}
          >
              <Text style={{ fontSize: 16 }}>{item.message}</Text>
              <Text style={{ fontSize: 10, color: "gray" }}>{item.messageTime.toLocaleString()}</Text>
          </View>
        </TouchableOpacity>
      )}}
      keyExtractor={(item) => item.messageId}
    />
  )

  const messageInput = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        elevation: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10
      }}>
      <TextInput
        multiline={true}
        placeholder="Input message here..."
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 10,
          minHeight: 40,
          maxHeight: 80,
          padding: 8,
          fontSize: 16
        }}
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity onPress={sendMessage} disabled={message.length == 0}>
        <Ionicons
          name={isInEditMode ? "pencil" : "send"} size={24}
          color={message.length == 0 ? "gray" : "black"}
          style={{ marginHorizontal: 10 }}
        />
      </TouchableOpacity>
    </View>
  )

  const optionsModal = (
    <BaseModal
      visible={isOptionsModalVisible}
      style={{ width: '80%' }}
      onRequestClose={closeOptionsModal}
    >
        <TouchableOpacity
          style={{ margin: 16 }}
          onPress={onOptionsModalEditSelected}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold'}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ margin: 16 }}
          onPress={onOptionsModalDeleteSelected}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold'}}>Delete</Text>
        </TouchableOpacity>
    </BaseModal>
  )
  const confirmDeleteModal = (
    <BaseModal
      visible={isConfirmDeleteModalVisible}
      onRequestClose={closeConfirmDeleteModal}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Confirm Delete Inbox</Text>
      <Text style={{ marginVertical: 16 }}>Are you sure you want to this message? You will lose all data associated with it.</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <BaseButton
          title="Delete"
          style={{ backgroundColor: 'transparent'}}
          textStyle={{color: 'darkorange', fontWeight: 'bold'}}
          onPress={onConfirmDeleteModalConfirm}
        />
        <BaseButton
          title="Cancel"
          style={{ backgroundColor: 'transparent'}}
          textStyle={{color: 'darkorange', fontWeight: 'bold'}}
          onPress={closeConfirmDeleteModal}
        />
      </View>
      
    </BaseModal>
  )

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {messageContent}
      {messageInput}
      {isKeyboardVisible && <View style={{ height: 335 }} />}
      {optionsModal}
      {confirmDeleteModal}
    </KeyboardAvoidingView>
  );
}