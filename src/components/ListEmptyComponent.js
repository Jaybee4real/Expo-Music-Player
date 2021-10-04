import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function ListEmptyComponent({ item }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.image} />
            <Text style={styles.text}>Sorry, You have no {item} for now</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    image: {
        height: 100,
        width: 100
    },
    text: {
        color: "white",
        marginTop: 20,
        fontSize: 15.5,
        fontFamily: 'Montserrat-500',
        maxWidth: "80%"
    }
})
