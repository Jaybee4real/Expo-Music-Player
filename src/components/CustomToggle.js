import React from 'react';
import {
  StyleSheet,
  View,
  UIManager,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

export default function CustomToggle(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        // props.setValue ? props.setValue(!props.value) : {};
        // setTimeout(() => (props.onValueChange ? props.onValueChange() : {}), 500);
        props.onValueChange?.()
      }}>
      {props.loading === true && <View style={styles.loadingOverlay}>
        <ActivityIndicator color="white" />
      </View>}
      <View
        style={[
          styles.viewToggle,
          props.toggleStyles,
          props.value === false
            ? { backgroundColor: '#7D7A8D' }
            : {
              backgroundColor: '#12161C',
              justifyContent: 'flex-end',
            },
        ]}>
        <View style={styles.circleToggle}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewToggle: {
    height: 31,
    width: 52,
    borderRadius: 37,
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleToggle: {
    width: 27,
    margin: 2,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    height: 31,
    width: 52,
    borderRadius: 37,
    flexDirection: 'row',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: 'center',
    position: "absolute",
    zIndex: 10,
    justifyContent: "center",
  }
});
