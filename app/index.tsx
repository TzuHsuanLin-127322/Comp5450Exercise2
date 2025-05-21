import { InboxModel } from "@/models/Inbox";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import 'react-native-get-random-values';
import AddEditInboxModal from "./addEditInboxModal";
import BaseButton from "./components/baseButton";
import CreateButton from "./components/createButton";
import InboxIcon from "./inboxIcon";
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
    addInbox,
    fetchInbox,
    editInbox
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
      <FlatList
        data={inbox.length % 2 == 0 ? inbox : [...inbox, null]}
        numColumns={2}
        ListFooterComponent={<View style={{height: 100}}/>}
        renderItem={({item}) => {
          if(item == null) {
            return (
              <View style={{flex: 1, margin: 8, padding: 8}}/>
            )
          }
          return (
            <View key={item.inboxId} style={{padding: 8, borderWidth: 1, borderColor: 'gray', borderRadius: 8, margin: 8, backgroundColor: 'white', flex: 1}}>
              <InboxIcon
                iconColor={item.iconColor}
                iconSymbol={item.iconSymbol}
                inboxName={item.inboxName}
              />
            </View>
          )
        }}
      />
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
        onSavePressed={(newInbox: InboxModel) => {
          console.log("onSavePressed", newInbox)
          if (!newInbox.inboxId) {
            addInbox(newInbox)
          } else {
            editInbox(newInbox)
          }
          setIsAddEditInboxModalVisible(false)
        }}
        visible={isAddEditInboxModalVisible}
        backdropColor={'#00000044'}
        animationType="fade"
      />
    </View>
  );
}

