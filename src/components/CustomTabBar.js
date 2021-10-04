import { useTheme } from "@react-navigation/native";
import React, { useRef } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";



const { width: ScreenWidth } = Dimensions.get('window');
export default function CustomOutlineTabbar({
    state,
    descriptors,
    navigation,
    position,
    height,
    width,
    tabBarStyles,
    ...props
}) {
    const tabPicker = useRef();
    const { colors, dark } = useTheme();
    const routes = state?.routes;

    return (
        <ScrollView
            ref={tabPicker}
            horizontal
            style={{
                flexDirection: "row",
                maxHeight: 30,
                minWidth: ScreenWidth * 2,
            }}>
            {routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={label.toString()}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={() => {
                            onPress();
                            tabPicker.current.scrollTo({
                                x: width * index,
                                animated: true,
                            });
                        }}
                        style={{
                            marginHorizontal: 22,
                            marginLeft: index === 0 ? 20 : 0,
                            height: height || 32,
                            flex: 1,
                            backgroundColor: "transparent",
                            marginTop: 5,
                            ...tabBarStyles,
                        }}
                    >
                        <Text
                            style={{
                                color: isFocused ? "#E89AA6" : "white",
                                fontFamily: "Montserrat-500",
                                fontSize: 16.5
                            }}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
