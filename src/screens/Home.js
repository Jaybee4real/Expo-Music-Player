import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Background from '../components/Background';
import CustomButton from '../components/CustomButton';
import Icon from "react-native-vector-icons/FontAwesome5"
import PlaylistCard from '../components/PlaylistCard';
import MiniPlayer from '../components/MiniPlayer';
import SongItem from "../components/SongItem"
import Constants from 'expo-constants';

export default function Home({ navigation, ...props }) {
	const { colors } = useTheme()
	return (
		<View style={styles.container} forceInset={{ bottom: "never" }}>
			<Background />
			<View style={styles.headingContainer} >
				<Image source={require('../assets/images/logo.png')} style={styles.logo} />
				<Text style={{ ...styles.headingText, color: colors.text }}>Library</Text>
				{/*  */}
				<View style={styles.rightContainer}>
					<TouchableOpacity >
						<Icon name="search" style={styles.icon} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.headingProfileIcon}>
						<Icon name="user" style={{ ...styles.icon, marginRight: 0 }} />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView style={styles.contentContainer}>
				<TouchableOpacity style={styles.sectionHeading}>
					<Text style={styles.sectionHeadingText}>Playlists</Text>
					<Icon name="chevron-right" style={styles.icon} />
				</TouchableOpacity>
				<View style={styles.row}>
					<PlaylistCard
						image={require('../assets/images/playlist_cover1.png')}
						name="Playlist"
						numberOfSongs={14}
					/>
					<PlaylistCard
						last
						name="Rythym and blues"
						image={require('../assets/images/playlist_cover2.png')}
						numberOfSongs={20}
					/>
				</View>
				{/*  */}
				<TouchableOpacity style={styles.sectionHeading}>
					<Text style={styles.sectionHeadingText}>Recently Played</Text>
					<Icon name="chevron-right" style={styles.icon} />
				</TouchableOpacity>
				<SongItem />
				<SongItem />
				<SongItem />
				<SongItem />
				<SongItem />
				<SongItem />
				<SongItem />
				<SongItem />
				<SongItem />
				<SongItem />
				<SongItem />
				<SongItem />
			</ScrollView>
			<MiniPlayer />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
	},
	logo: {
		height: 30,
		width: 30,
		marginRight: 15
	},
	headingContainer: {
		width: "100%",
		paddingHorizontal: 15,
		marginTop: Platform.OS === 'ios' ? 5 : 20,
		flexDirection: "row",
		alignItems: "center",
		paddingBottom: 10,
		backgroundColor: "transparent"
	},
	headingText: {
		fontSize: 20,
		fontFamily: "Montserrat-600"
	},
	icon: {
		fontSize: 17,
		color: "white",
		marginRight: 10
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	headingProfileIcon: {
		height: 35,
		width: 35,
		borderRadius: 25,
		borderWidth: 1.5,
		borderColor: "white",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 10
	},
	rightContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: "auto",
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 15,
	},
	sectionHeading: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 20,
		justifyContent: "space-between",
	},
	sectionHeadingText: {
		fontSize: 16.5,
		color: "white",
		fontFamily: "Montserrat-600"
	},
});