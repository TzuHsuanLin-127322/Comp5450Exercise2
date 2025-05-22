import { MessageModel } from "@/models/Message";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMessageViewModel } from "./useMessageViewModels";

export default function Message() {
  const { title, inboxId, iconColor, iconSymbol } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [message, setMessage] = useState("");
  const messageListRef = useRef<FlatList<MessageModel>>(null);

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
    createMessage(message);
    setMessage("");
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
        <View style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 16,
          padding: 8,
          backgroundColor: "white",
          marginVertical: 8
        }}>
          <Text style={{ fontSize: 16 }}>{item.message}</Text>
          <Text style={{ fontSize: 10, color: "gray" }}>{item.messageTime.toLocaleString()}</Text>
        </View>
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
      <TouchableOpacity onPress={sendMessage}>
        <Ionicons name="send" size={24} color="black" style={{ marginHorizontal: 10 }}/>
      </TouchableOpacity>
    </View>
  )

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {messageContent}
      {messageInput}
      {isKeyboardVisible && <View style={{ height: 335 }} />}
    </KeyboardAvoidingView>
  );
}