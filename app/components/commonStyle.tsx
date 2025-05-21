import { ViewStyle } from "react-native";

export const centered: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
}

export const buttonBaseStyle: ViewStyle = {
    ...centered,
    backgroundColor: "orange",
    flexDirection: 'row',
    borderRadius: 16,
    paddingHorizontal: 18,
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