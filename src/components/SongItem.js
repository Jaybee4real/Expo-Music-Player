import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5"
import { useTheme, useNavigation } from '@react-navigation/native';
import { convertTime } from "../misc/helpers"

const { width } = Dimensions.get('window')

export default function SongItem({ title, isPlaying, duration, onAudioPress, activeListItem }) {
    const { colors } = useTheme()
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => onAudioPress()}
                style={{
                    ...styles.imageContainer,
                    backgroundColor: activeListItem === true
                        ? "red"
                        : "transparent"
                }}>
                <Image source={require('../assets/images/songItemImage.png')} style={styles.image} />
                {activeListItem &&  <Icon name={isPlaying ? "pause" : "play"} style={styles.playIcon} />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.textContainer} onPress={() => {onAudioPress()}}>
                <Text style={{...styles.songName, color: activeListItem ? colors.primary : "white"}} numberOfLines={1}>{title}</Text>
                <Text style={styles.artist}>Unknown Artist - {convertTime(duration)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
                <Icon name="heart" style={styles.icon} color={colors.brown} />
            </TouchableOpacity>
        </View>
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
        borderRadius: 20
    },
    songName: {
        fontSize: 14,
        fontFamily: "Montserrat-600",
        color: "white",
        marginBottom: 5
    },
    artist: {
        fontSize: 12.6,
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
        marginTop: 10
    },
    icon: {
        fontSize: 24,
    },
    imageContainer: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        marginRight: 10,
        borderRadius: 20
    },
    playIcon: {
        fontSize: 16,
        color: "white",
        position: "absolute",
    }
})
