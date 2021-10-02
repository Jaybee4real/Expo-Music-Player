import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'

const { width } = Dimensions.get("screen")

export default function PlaylistCard({ image, name, numberOfSongs, last }) {
    const ImageSource = image ? image : require('../assets/images/playlist_cover1.png')

    return (
        <TouchableOpacity style={{ ...styles.container, marginRight: !last ? 25 : 0 }}>
            <Image resizeMode="stretch" style={styles.image} source={ImageSource} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.numberOfSongs}>{numberOfSongs} songs</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: 270,
        width: width / 2 - 40,
        borderRadius: 21,
    },
    image: {
        height: 220,
        width: width / 2 - 30,
        borderRadius: 21
    },
    name: {
        fontFamily: "Montserrat-600",
        color: "white",
        marginLeft: 5,
        marginTop: 10,
        fontSize: 15.5
    },
    numberOfSongs: {
        fontFamily: "Montserrat-600",
        color: "white",
        marginLeft: 7,
        marginTop: 4,
        fontSize: 13.6
    }
})