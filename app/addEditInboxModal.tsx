import { InboxModel } from "@/models/Inbox";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ModalProps, Text, TextInput, TouchableOpacity, View, ViewStyle } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import EmojiPicker, { EmojiType } from "rn-emoji-keyboard";
import BaseButton from "./components/baseButton";
import { centered } from "./components/commonStyle";

type AddEditInboxModalProps = ModalProps & {
  initialInbox?: InboxModel,
  onClosePressed: () => void,
  onSavePressed: (inbox: InboxModel) => void
}

const squareIconStyle: ViewStyle = {
  ...centered,
  aspectRatio: 1,
  height: 60,
  backgroundColor: 'orange',
  borderRadius: 16,
  padding:8
}

const rowStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const AddEditInboxModal: React.FC<AddEditInboxModalProps> = (props: AddEditInboxModalProps) => {
  const { initialInbox, onClosePressed, onSavePressed, ...others } = props
  const [isEmojiSelectorVisible, setIsEmojiSelectorVisible] = useState(false)
  const [isColorSelectorVisible, setIsColorSelectorVisible] = useState(false)
  const [inboxName, setInboxName] = useState(initialInbox?.inboxName ?? '')
  const [iconColor, setIconColor] = useState(initialInbox?.iconColor ?? '#000000')
  const [iconSymbol, setIconSymbol] = useState(initialInbox?.iconSymbol ?? ' ')

  const title = initialInbox ? "Edit Inbox" : "Add Inbox"


  const titleBar = (
    <View style={rowStyle}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <TouchableOpacity onPress={onClosePressed}><Ionicons name="close" size={24} /></TouchableOpacity>
    </View>
  )

  const inboxNameInput = (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', paddingVertical: 8 }}>
      <Text style={{ marginRight: 8 }}>Inbox Name</Text>
      <TextInput
        style={{ marginTop: 16, flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 8, padding: 8 }}
        placeholder="Inbox Name"
        value={inboxName}
        onChangeText={setInboxName}
      />
    </View>
    
  )

  const emojiColorSelection = (
    <View style={[rowStyle,{paddingVertical: 8 }]}>
      <Text style={{ marginRight: 8 }}>Icon Emoji</Text>
      <TouchableOpacity 
        style={{...squareIconStyle, marginRight: 16}}
        onPress={() => { setIsEmojiSelectorVisible(true) }}
      >
        <Text style={{fontSize: 30}}>{iconSymbol}</Text>
      </TouchableOpacity>
      <Text style={{ marginRight: 8 }}>Icon Color</Text>
      <TouchableOpacity
        style={{...squareIconStyle, backgroundColor: iconColor, borderWidth: 1, borderColor: 'gray'}}
        onPress={() => { setIsColorSelectorVisible(!isColorSelectorVisible) }}
      />
    </View>
  )

  const colorPickerView = isColorSelectorVisible && (
    <View style={{ flexDirection: 'column', alignItems: 'center',  paddingVertical: 8, paddingHorizontal: 16, borderColor: 'grey', borderWidth: 1 }}>
      <View style={rowStyle}>
        <Text style={{ marginRight: 8, flex: 1 }}>Icon Color Selector</Text>
        <TouchableOpacity onPress={() => { setIsColorSelectorVisible(false) }}><Ionicons name="close" size={20} /></TouchableOpacity>
      </View>
      <View style={{width: 200, height: 200}}>
        <ColorPicker
          color={iconColor}
          row={true}
          thumbSize={20}
          swatches={false}
          noSnap={true}
          onColorChange={setIconColor}
        />
      </View>
    </View>
  )

  const iconPreview = (
    <View style={[]}>
      <Text>Icon Preview</Text>

    </View>
  )


  const saveButton = (
    <BaseButton
      style={{ marginTop: 8 }}
      title="Save"
      onPress={() => {
        onSavePressed({
          inboxId: initialInbox?.inboxId ?? undefined,
          inboxName: initialInbox?.inboxName ?? inboxName,
          iconColor: initialInbox?.iconColor ?? '',
          iconSymbol: initialInbox?.iconSymbol ?? ''
        })
      }}
    />
  )

  const emojiPickerModal = (
    <EmojiPicker
        open={isEmojiSelectorVisible}
        onClose={() => { setIsEmojiSelectorVisible(false) }}
        onEmojiSelected={(emoji: EmojiType) => {
          setIconSymbol(emoji.emoji)
          setIsEmojiSelectorVisible(false)
        }}
      />
  )

  return (
    <Modal {...others} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={[{ padding: 16, backgroundColor: 'white', maxWidth: '80%', borderRadius: 16 }]}>
          {titleBar}
          {inboxNameInput}
          {emojiColorSelection}
          {colorPickerView}
          {saveButton}
        </View>
      </View>
      {emojiPickerModal}
    </Modal>
  )
}

export default AddEditInboxModal


