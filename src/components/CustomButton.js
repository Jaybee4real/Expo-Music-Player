/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Spinner, Icon } from 'native-base';

export default function CustomButton({
  buttonStyles,
  disabled,
  loading,
  onPress,
  iconStyles,
  iconLeftName,
  textColor,
  labelElement,
  loadingIconColor,
  label,
  iconRightName,
  iconRightType,
  labelStyles,
  iconLeftType,

  ...props
}) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        ...styles.customButton,
        backgroundColor: loading
          ? 'grey'
          : disabled
            ? 'grey'
            : colors.primary,
        ...buttonStyles,
      }}
      onPress={onPress && !disabled ? onPress : () => { }}>
      {iconLeftName && (
        <Icon
          type={iconLeftType || 'MaterialIcons'}
          style={{ color: 'white', marginLeft: 10, ...iconStyles }}
          name={iconLeftName}
        />
      )}
      <Text
        style={{
          color: textColor ? textColor : 'white',
          fontSize: 15,
          fontWeight: '600',
          ...labelStyles,
        }}>
        {label}
      </Text>
      {labelElement || null}
      {loading && (
        <Spinner
          style={{
            marginLeft: 5,
            marginTop: 3,
          }}
          size="small"
          color={loadingIconColor ? loadingIconColor : 'white'}
        />
      )}
      {iconRightName && (
        <Icon
          type={iconRightType || 'FontAwesome'}
          style={{ ...iconStyles, color: 'white', marginLeft: 10 }}
          name={iconRightName}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  customButton: {
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
  },
});
