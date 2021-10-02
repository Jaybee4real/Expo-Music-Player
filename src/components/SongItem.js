import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5"
import { useTheme } from '@react-navigation/native';

const { width } = Dimensions.get('window')

export default function SongItem() {
    const { colors } = useTheme()
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={require('../assets/images/songItemImage.png')} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.songName}>Shape Shifter</Text>
                <Text style={styles.artist}>Alessia Cara</Text>
            </View>
            <View style={styles.iconContainer}>
                <Icon name="heart" style={styles.icon} color={colors.brown} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width - 40,
        // minHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    image: {
        height: 40,
        width: 40,
        marginRight: 10
    },
    songName: {
        fontSize: 15.5,
        fontFamily: "Montserrat-600",
        color: "white",
        marginBottom: 5
    },
    artist: {
        fontSize: 13.5,
        fontFamily: "Montserrat-500",
        color: "white",
    },
    textContainer: {
        maxWidth: width - 40 - 100,
        width: "100%",
        borderBottomColor: "#E89AA6",
        borderBottomWidth: 0.2,
        paddingBottom: 5
    },
    iconContainer: {
        marginLeft: 'auto',
    },
    icon: {
        fontSize: 24,
    }
})
