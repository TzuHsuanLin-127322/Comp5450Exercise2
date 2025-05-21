import { ViewStyle } from "react-native";

export const buttonBaseStyle: ViewStyle = {
    backgroundColor: "orange",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8
}

export const buttonCreateFABStyle: ViewStyle = {
    ...buttonBaseStyle,
    borderRadius: 64,
    paddingHorizontal: 0,
    paddingVertical: 0,
    position: 'absolute',
    bottom: 16,
    right: 16
}