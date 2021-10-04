import React, { useContext, useEffect } from 'react'
import { Text, StyleSheet, Dimensions, Image, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from "react-native-vector-icons/MaterialIcons"
import { isIphoneWithNotch } from '../utils/helpers'
import { AudioContext } from '../context/AudioProvider';
import {
    changeAudio,
    selectAudio,
} from '../misc/audioController';
import { convertTime } from "../misc/helpers"
import { TouchableOpacity } from "react-native-gesture-handler"
import { View } from "native-base"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get('window')
export default function MiniPlayer() {
    const context = useContext(AudioContext)
    const navigation = useNavigation()

    useEffect(() => {
        // console.log(JSON.stringify(context.isPlaying, null, 2))
        console.log()
    }, [])

    const handlePlayPause = async () => {
        await selectAudio(context.currentAudio, context);
    }


    const handleNext = async () => {
        await changeAudio(context, 'next');
    }

    const handlePrevious = async () => {
        await changeAudio(context, 'previous');
    }

    const renderCurrentTime = () => {
		if (!context.soundObj && context.currentAudio.lastPosition) {
			return convertTime(context.currentAudio.lastPosition / 1000);
		}
		return convertTime(context.playbackPosition / 1000);
	};

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <LinearGradient
                    locations={[0, 0.5]}
                    colors={['#E89AA6', 'rgba(0, 0, 0, 0.6)']}
                    style={styles.background}
                />
                <View style={styles.row}>
                    <Image source={require('../assets/images/playingMusic.png')} style={styles.image} />
                    <TouchableOpacity style={styles.nameContainer} onPress={() => navigation.push("MusicPlayer")}>
                        <Text style={styles.title} numberOfLines={1}>{context.currentAudio.filename}</Text>
                        <Text style={styles.artist}>Unknown artist - {renderCurrentTime()} / {convertTime(context.currentAudio.duration)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.controlsContainer}>
                    <TouchableOpacity onPress={handlePrevious}>
                        <Icon name="skip-previous" style={{ ...styles.controlIcon, marginRight: 7 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.playContainer} onPress={handlePlayPause}>
                        <Image source={require('../assets/images/swirl.png')} style={styles.play} />
                        <Icon name={context.isPlaying ? "pause" : "play-arrow"} light size={25} color="#fff" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNext}>
                        <Icon name="skip-next" style={{ ...styles.controlIcon, marginLeft: 7 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: width - 20,
        marginHorizontal: 10,
        alignItems: "center",
        alignSelf: "center",
        height: 0,
    },
    inner: {
        height: 60,
        bottom: isIphoneWithNotch() ? 77 : 65,
        width: width - 20,
        borderRadius: 28,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        overflow: "hidden",
        backgroundColor: "#E89AA6",
        zIndex: 100000000
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
        fontSize: 15.5,
        marginBottom: 3,
        marginTop: 3,
        color: "white",
        width: width - 205
    },
    artist: {
        fontFamily: "Montserrat-600",
        fontSize: 12.5,
        marginBottom: 4,
        color: "white"
    },
    controlsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    playContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 35,
        width: 35,
        borderRadius: 17.5
    },
    play: {
        height: 35,
        width: 35,
    },
    controlIcon: {
        fontSize: 24,
        color: "white",
    },
    icon: {
        alignSelf: "center",
        position: "absolute",
    },
    innerShadow: {
        backgroundColor: "red",
        height: "100%",
        width: 100,
        position: "absolute",
        bottom: 100
    }
})