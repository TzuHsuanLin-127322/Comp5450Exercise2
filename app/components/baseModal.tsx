import { Modal, ModalProps, TouchableWithoutFeedback, View } from "react-native";

type BaseModalProps = ModalProps & {
}

const BaseModal: React.FC<BaseModalProps> = (props: BaseModalProps) => {
  const { visible, children, style, onRequestClose, ...others } = props
  return (
    <Modal
      visible={visible}
      backdropColor={'#00000044'}
      animationType="fade"
      {...others}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={[style, { padding: 16, backgroundColor: 'white', maxWidth: '80%', borderRadius: 16 }]}>
            {props.children}
          </View>
        </View>
      </TouchableWithoutFeedback>

    </Modal>
  )
}

export default BaseModal