import React, { useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList, LogBox } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome5"
import PlaylistCard from '../../components/PlaylistCard';
import SongItem from "../../components/SongItem"
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import Background from '../../components/Background';
import * as MediaLibrary from 'expo-media-library';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import Constants from 'expo-constants';
import { AudioContext } from '../../context/AudioProvider';
import {
  play,
  pause,
  resume,
  playNext,
  selectAudio,
} from '../../misc/audioController';

LogBox.ignoreLogs(["VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead"])

export default function HomeTab() {
	const { colors } = useTheme()
	 const context = useContext(AudioContext)

	const rowRenderer = (type, item, index, extendedState) => {
		return (
			<SongItem
				title={item.filename}
				isPlaying={extendedState.isPlaying}
				activeListItem={this.context.currentAudioIndex === index}
				duration={item.duration}
				onFavourite={() => console.log("Is Favourited")}
				onAudioPress={() => this.handleAudioPress(item)}
				onOptionPress={() => {
					this.currentItem = item;
					this.setState({ ...this.state, optionModalVisible: true });
				}}
			/>
		);
	};

	const layoutProvider = new LayoutProvider(
		i => 'audio',
		(type, dim) => {
			switch (type) {
				case 'audio':
					dim.width = Dimensions.get('window').width;
					dim.height = 70;
					break;
				default:
					dim.width = 0;
					dim.height = 0;
			}
		}
	);

	const handleAudioPress = async (audio) => {
    	await selectAudio(audio, context);
 	 };


	return (
		<View style={{ flex: 1 }}>
			<Background />
			<ScrollView style={styles.contentContainer}>
				<TouchableOpacity style={styles.sectionHeading}>
					<Text style={styles.sectionHeadingText}>Playlists</Text>
					<Icon name="chevron-right" style={styles.icon} />
				</TouchableOpacity>
				<View style={styles.row}>
					<PlaylistCard
						image={require('../../assets/images/playlist_cover1.png')}
						name="Playlist"
						numberOfSongs={14}
					/>
					<PlaylistCard
						last
						name="Rythym and blues"
						image={require('../../assets/images/playlist_cover2.png')}
						numberOfSongs={20}
					/>
				</View>
				{/*  */}
				<TouchableOpacity style={styles.sectionHeading}>
					<Text style={styles.sectionHeadingText}>Recently Added</Text>
					<Icon name="chevron-right" style={styles.icon} />
				</TouchableOpacity>  
				<FlatList
					scollEnabled={false}
					style={{flex: 1, paddingBottom: 100}}
					data={context.audioFiles.slice(0, 10)} 
					renderItem={({ item, index }) =>
					 <SongItem 
						title={item.filename}
						ListEmptyComponent={() => <Text>Hello There</Text>}
						activeListItem={context.currentAudioIndex === index}
						duration={item.duration}
						onFavourite={() => console.log("Is Favourited")}
						onAudioPress={() => handleAudioPress(item)} 
						onOptionPress={() => {
							this.currentItem = item;
							this.setState({ ...this.state, optionModalVisible: true });
						}}
					/>}
				 />
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
});