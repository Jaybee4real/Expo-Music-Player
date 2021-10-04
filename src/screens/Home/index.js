import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,  Platform, Dimensions } from 'react-native';
import Background from '../../components/Background';
import Icon from "react-native-vector-icons/FontAwesome5"
import MiniPlayer from '../../components/MiniPlayer';
import Constants from 'expo-constants';

// Page
import TrackList from "./TrackList"
import Search from './Search';
import HomeTab from './HomeTab';
import Playlist from './Playlist';


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomTabBar from '../../components/CustomTabBar';

// import Screens
const { height, width } = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();
export default function Home({ navigation, ...props }) {
	const { colors } = useTheme()

	return (
		<View style={styles.container} forceInset={{ bottom: "never" }}>
			<Background />
			<View style={styles.headingContainer} >
				<Image source={require('../../assets/images/logo.png')} style={styles.logo} />
				<Text style={{ ...styles.headingText, color: colors.text }}>Library</Text>
				{/*  */}
				<View style={styles.rightContainer}>
					<TouchableOpacity>
						<Icon name="search" style={styles.icon} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.headingProfileIcon}>
						<Icon name="user" style={{ ...styles.icon, marginRight: 0 }} />
					</TouchableOpacity>
				</View>
			</View>
			{/* Tabs */}
			<Tab.Navigator
				backBehavior="none"
				tabBar={(props) => <CustomTabBar {...props} />}>
				<Tab.Screen name="Home" component={HomeTab} />
				<Tab.Screen name="Tracks" component={TrackList} />
				<Tab.Screen name="Playlists" component={Playlist} />
				<Tab.Screen name="Search" component={Search} />
			</Tab.Navigator>
			<MiniPlayer />
		</View >
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
});