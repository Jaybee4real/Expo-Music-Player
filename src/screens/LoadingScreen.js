import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome5"

export default function LoadingScreen({ navigation, ...props }) {
    const { colors } = useTheme()

    return (
        <View style={{ ...styles.container, backgroundColor: 'black' }}>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <Image source={require('../assets/images/HeadphoneImage.png')} style={styles.image} />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.6)', '#e89aa64d']}
                style={styles.background}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 150,
        width: 150,
    }, 
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});