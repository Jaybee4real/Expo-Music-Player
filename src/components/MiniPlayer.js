import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Platform, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from "react-native-vector-icons/MaterialIcons"
import { isIphoneWithNotch } from '../utils/helpers'


const { width } = Dimensions.get('window')
export default function MiniPlayer() {
    const [playState, setPlayState] = React.useState(false)
    
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <LinearGradient
                    locations={[0.1, 0.75]}
                    colors={['#E89AA6', 'rgba(0, 0, 0, 0.6)']}
                    style={styles.background}
                />
                <Image source={require('../assets/images/playingMusic.png')} style={styles.image} />
                <View style={styles.nameContainer}>
                    <Text style={styles.title}>Sweet Dreams</Text>
                    <Text style={styles.artist}>Alessia Cara</Text>
                </View>
                <TouchableOpacity style={styles.playContainer} onPress={() => setPlayState(!playState)}>
                    <Image source={require('../assets/images/swirl.png')} style={styles.play} />
                    <Icon name={playState ? "pause" : "play-arrow"} light size={25} color="#fff" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: 0,
        marginHorizontal: 10,
        backgroundColor: "transparent",
        alignItems: "center",
        alignSelf: "center",
        position: "relative"
    },
    inner: {
        height: 60,
        top: isIphoneWithNotch() ? -77 : -65,
        width: "100%",
        position: "absolute",
        borderRadius: 28,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        overflow: "hidden",
        backgroundColor: "#E89AA6"
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: width,
        transform: [{ rotateZ: "-90deg" }],
    },
    nameContainer: {
        height: "100%",
        justifyContent: "center"
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 7,
    },
    title: {
        fontFamily: "Montserrat-600",
        fontSize: 16.5,
        marginBottom: 5,
        color: "white"
    },
    artist: {
        fontFamily: "Montserrat-600",
        fontSize: 13.5,
        marginBottom: 4,
        color: "white"
    },
    playContainer: {
        marginLeft: "auto",
        alignItems: "center",
        justifyContent: "center",
    },
    play: {
        height: 55,
        width: 55,
    },
    icon: {
        alignSelf: "center",
        position: "absolute",
    }
})