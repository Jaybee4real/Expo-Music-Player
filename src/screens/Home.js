import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Background from '../components/Background';
import CustomButton from '../components/CustomButton';
import Icon from "react-native-vector-icons/FontAwesome5"
import PlaylistCard from '../components/PlaylistCard';
import MiniPlayer from '../components/MiniPlayer';

export default function Home({ navigation, ...props }) {
	const { colors } = useTheme()
	return (
		<SafeAreaView style={styles.container}>
			<Background />
			<View style={styles.headingContainer} >
				<Image source={require('../assets/images/logo.png')} style={styles.logo} />
				<Text style={{ ...styles.headingText, color: colors.text }}>Library</Text>
				{/*  */}
				<TouchableOpacity style={styles.headingIcon}>
					<Icon name="search" style={styles.icon} />
				</TouchableOpacity>
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
			</ScrollView>
			<MiniPlayer />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
	},
	logo: {
		height: 30,
		width: 30,
		marginRight: 15
	},
	headingContainer: {
		width: "100%",
		paddingHorizontal: 20,
		marginTop: Platform.OS === 'ios' ? 5 : 20,
		flexDirection: "row",
		alignItems: "center",
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
	headingIcon: {
		marginLeft: "auto",
	},
	contentContainer: {
		flex: 1,
		paddingHorizontal: 20,
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
	}
});