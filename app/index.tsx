import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AddEditInboxModal from "./addEditInboxModal";
import BaseButton from "./components/baseButton";
import CreateButton from "./components/createButton";
import { useInboxViewModel } from "./useInboxViewModel";

export default function Inbox() {
  const navigation = useNavigation()

  useEffect(()=> {
    navigation.setOptions({title: "Inbox"})
  })

  const [isAddEditInboxModalVisible, setIsAddEditInboxModalVisible] = useState(false)

  const {
    inbox,
    apiState,
    error,
  } = useInboxViewModel()

  if(error) {
    // TODO: Return error display
  }

  const onCreateInboxPress = () => {
    console.log("onCreateInboxPress")
    setIsAddEditInboxModalVisible(true)
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
          style={{marginTop: 8}}
          title="Create Inbox"
          onPress={onCreateInboxPress}
          icon={<Ionicons name="add" color={'white'} size={16}/>}
        />
      </View>
    ) : (
      <View>
        <Text>Has Content, in construction</Text>
      </View>
    )
  // TODO: Add Inbox floating action button
  // TODO: Add Inbox item
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'green'
      }}
    >
      {content}
      <CreateButton onPress={onCreateInboxPress}/>
      <AddEditInboxModal
        initialInbox={undefined}
        onClosePressed={() => setIsAddEditInboxModalVisible(false)}
        onSavePressed={() => {}}
        visible={isAddEditInboxModalVisible}
        backdropColor={'#00000044'}
        animationType="fade"
      />
    </View>
  );
}

