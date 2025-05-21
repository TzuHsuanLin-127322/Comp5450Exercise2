import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { buttonBaseStyle } from "./components/commonStyle";
import CreateButton from "./components/createButton";
import { useInboxViewModel } from "./useInboxViewModel";

export default function Inbox() {
  const navigation = useNavigation()

  useEffect(()=> {
    navigation.setOptions({title: "Inbox"})
  })

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
    router.push
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
        <TouchableOpacity
          style={{...buttonBaseStyle, marginVertical: 8}}
          onPress={onCreateInboxPress}
        >
          <Ionicons name="add" color={'white'} size={16}/>
          <View style={{width: 8}}/>
          <Text style={{color: 'white'}}>Create Inbox</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <>
        <Text>Has Content, in construction</Text>
      </>
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
    </View>
  );
}

