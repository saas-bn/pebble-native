import * as React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Text from "./Text";
import colors from "../theme/colors";
import { ButtonProps, DoubleFooterButtonProps } from "./typings/Button";
import Touchable from "./shared/Touchable";

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    minWidth: 150,
    paddingHorizontal: 20,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.white.base,
    borderTopColor: colors.gray.lighter,
    borderTopWidth: 1
  },
  doubleFooterBtnWrapper: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between"
  },
  dfButton: {
    width: "49%"
  }
});

const buttonBackgroundColor = {
  primary: colors.violet.base,
  secondary: colors.gray.lighter,
  link: "transparent"
};

const buttonBackgroundDisabledColor = {
  primary: colors.violet.lighter,
  secondary: colors.gray.lightest,
  link: "transparent"
};

const fontColor = {
  primary: colors.white.base,
  secondary: colors.gray.darker,
  link: colors.violet.base
};

const disabledFontColor = {
  ...fontColor,
  secondary: colors.gray.light
};

// @ts-ignore
const FooterButton: React.FunctionComponent<Partial<ButtonProps>> = ({
  onPress,
  children,
  ...rest
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button onPress={onPress} {...rest}>
        {children}
      </Button>
    </View>
  );
};

const DoubleFooterButton: React.FunctionComponent<DoubleFooterButtonProps> = ({
  leftButtonLabel,
  rightButtonLabel,
  leftButtonType = "secondary",
  rightButtonType,
  onLeftButtonPress,
  onRightButtonPress,
  leftDisabled,
  rightDisabled
}) => {
  return (
    <View style={styles.doubleFooterBtnWrapper}>
      <Button
        disabled={leftDisabled}
        style={styles.dfButton}
        type={leftButtonType}
        onPress={onLeftButtonPress}
      >
        {leftButtonLabel}
      </Button>
      <Button
        disabled={rightDisabled}
        type={rightButtonType}
        style={styles.dfButton}
        onPress={onRightButtonPress}
      >
        {rightButtonLabel}
      </Button>
    </View>
  );
};

class Button extends React.Component<ButtonProps> {
  static FooterButton = FooterButton;

  static DoubleFooterButton = DoubleFooterButton;

  static defaultProps = {
    type: "primary"
  };

  render() {
    let {
      children,
      onPress,
      type,
      loading,
      disabled,
      style,
      onLongPress,
      transparent,
      radius
    } = this.props;

    const _disabled = disabled || loading;
    const textColor = transparent
      ? disabled
        ? buttonBackgroundDisabledColor[type]
        : buttonBackgroundColor[type]
      : disabled
      ? disabledFontColor[type]
      : fontColor[type];
    return (
      <Touchable
        onPress={_disabled ? undefined : onPress}
        disabled={_disabled}
        onLongPress={_disabled ? undefined : onLongPress}
      >
        <View
          style={[
            styles.buttonStyle,
            {
              backgroundColor: disabled
                ? buttonBackgroundDisabledColor[type]
                : buttonBackgroundColor[type]
            },
            type === "link"
              ? {
                  justifyContent: "flex-start"
                }
              : undefined,
            transparent
              ? {
                  backgroundColor: "transparent",
                  borderColor: buttonBackgroundColor[type],
                  borderWidth: 1,
                  ...(disabled
                    ? {
                        borderColor: buttonBackgroundDisabledColor[type]
                      }
                    : {})
                }
              : undefined,
            radius
              ? {
                  borderRadius: 25
                }
              : undefined,
            style
          ]}
        >
          {loading ? (
            <ActivityIndicator color={textColor} />
          ) : (
            <Text size={15} bold color={textColor}>
              {children}
            </Text>
          )}
        </View>
      </Touchable>
    );
  }
}

export default Button;
