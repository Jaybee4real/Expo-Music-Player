import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';


export default function Background() {
    const { colors, dark } = useTheme()
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <LinearGradient
                locations={[0.5, 1]}
                colors={['rgba(0, 0, 0, 0.6)', '#e89aa64d']}
                style={styles.background}
            />
        </>
    )
}


const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#000',
    },
})