import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import PlaylistCard from '../../components/PlaylistCard';
import { useTheme } from '@react-navigation/native';
import Background from '../../components/Background';
import Constants from 'expo-constants';
import { AudioContext } from '../../context/AudioProvider';
import { useFocusEffect } from '@react-navigation/core';



const { height, width } = Dimensions.get('window');

export default function Playlist({ ...props }) {
    const { colors } = useTheme()
    const context = useContext(AudioContext)


    useFocusEffect(
        React.useCallback(() => {
            props.route.params.setActivePage("Playlists")
        }, [])
    );

    return (
        <View style={{ flex: 1 }}>
            <Background />
            <ScrollView style={styles.contentContainer}>
                <TouchableOpacity style={styles.sectionHeading}>
                    <Text style={styles.sectionHeadingText}>Playlists</Text>
                    {/* <Icon name="chevron-right" style={styles.icon} /> */}
                </TouchableOpacity>
                <View style={styles.row}>
                    {context.playList.map((playlist, index) => (
                        <PlaylistCard
                            key={index}
                            image={playlist.albumArt}
                            name={playlist.name}
                            numberOfSongs={playlist.tracks.length}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.createContainer}>
                    <Icon name="plus" style={styles.createIcon} />
                    <Text style={styles.text}>Create Playlist</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        zIndex: 1
    },
    sectionHeading: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
        justifyContent: "space-between",
    },
    sectionHeadingText: {
        fontSize: 16,
        color: "white",
        fontFamily: "Montserrat-600"
    },
    createContainer: {
        height: 220,
        width: width / 2 - 20,
        borderRadius: 21,
        borderColor: "grey",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    createIcon: {
        fontSize: 40,
        color: "white",
        marginBottom: 10
    },
    text: {
        fontSize: 15,
        color: "white",
        fontFamily: "Montserrat-500",
    }
});