import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, Platform, Animated, Easing } from 'react-native';
import MDIcon from "react-native-vector-icons/MaterialIcons"
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { useTheme } from '@react-navigation/native';
import Background from '../components/Background';
import Constants from 'expo-constants';
import Slider from '@react-native-community/slider';
import { AudioContext } from '../context/AudioProvider';
import { convertTime } from '../misc/helpers';
import {
	changeAudio,
	moveAudio,
	pause,
	selectAudio
} from '../misc/audioController';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import RenderPlaylistModal from '../components/RenderPlaylistModal';

const { width } = Dimensions.get('screen')
export default function MusicPlayer({ navigation, ...props }) {
	const { colors, dark } = useTheme()
	const context = useContext(AudioContext)
	const { playbackPosition, playbackDuration, currentAudio, isPlaying } = context;
	const [currentPosition, setCurrentPosition] = useState(0);
	const [progress, setProgress] = useState(0);
	const animatedValue = useRef(new Animated.Value(0)).current;
	const playlistModalRef = useRef(null);

	const calculateSeebBar = () => {
		if (playbackPosition !== null && playbackDuration !== null) {
			return playbackPosition / playbackDuration;
		} if (currentAudio.lastPosition) {
			return currentAudio.lastPosition / (currentAudio.duration * 1000);
		} return 0;
	}

	const renderCurrentTime = () => {
		if (!context.soundObj && currentAudio.lastPosition) {
			return convertTime(currentAudio.lastPosition / 1000);
		} return convertTime(playbackPosition / 1000);
	};

	const handlePlayPause = async () => {
		await selectAudio(context.currentAudio, context);
	}

	const handleNext = async () => {
		await changeAudio(context, 'next');
	}

	const handlePrevious = async () => {
		await changeAudio(context, 'previous');
	}

	useEffect(() => {
		if (playbackPosition !== null && playbackDuration !== null) {
			setProgress(playbackPosition / playbackDuration * 100)
		} else setProgress(0)
	}, [playbackPosition, isPlaying])


	useEffect(() => {
		if (isPlaying) {
			Animated.loop(
				Animated.timing(animatedValue, {
					toValue: 1,
					duration: 8000,
					useNativeDriver: true,
					easing: Easing.linear,
				}),
				{ iterations: -1 }
			).start()
		} else animatedValue.setValue(0)
	}, [isPlaying])


	return (
		<View style={{ ...styles.container, backgroundColor: colors.primary }}>
			<Background />
			<View style={styles.headingContainer}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<MDIcon name="chevron-left" size={30} color="white" />
				</TouchableOpacity>
				<Text style={{ ...styles.headingText, color: colors.background }}>Now Playing</Text>
				<TouchableOpacity>
					<MDIcon name="more-horiz" size={30} color="white" />
				</TouchableOpacity>
			</View>
			<View style={styles.contentContainer}>
				<View style={styles.imageContainer}>
					<AnimatedProgressWheel
						size={width * 0.75}
						width={5}
						color={'grey'}
						progress={progress}
						animateFromValue={0}
						backgroundColor={colors.primary}
					/>
					<Animated.Image
						source={require('../assets/images/playlist_cover1.png')}
						style={{
							...styles.image,
							transform: [{
								rotateZ: animatedValue.interpolate({
									inputRange: [0, 1],
									outputRange: ["0deg", "360deg"]
								})
							}]
						}}
					/>
				</View>
				<View style={styles.trackDetailsContainer}>
					<Text style={styles.trackName} numberOfLines={1}>{currentAudio.filename}</Text>
					<Text style={styles.albumName}>Unknown Artist</Text>
				</View>
				<Slider
					style={{ width: width - 20, height: 40 }}
					minimumValue={0}
					maximumValue={1}
					value={calculateSeebBar()}
					minimumTrackTintColor={colors.primary}
					maximumTrackTintColor={"grey"}
					onValueChange={value => {
						setCurrentPosition(
							convertTime(value * context.currentAudio.duration)
						);
					}}
					onSlidingStart={async () => {
						if (!context.isPlaying) return;
						try {
							await pause(context.playbackObj);
						} catch (error) {
							console.log('error inside onSlidingStart callback', error);
						}
					}}
					onSlidingComplete={async value => {
						await moveAudio(context, value);
						setCurrentPosition(0);
					}}
				/>
				<View style={styles.infoContainer}>
					<Text style={styles.currentTime}>
						{currentPosition ? currentPosition : renderCurrentTime()}
					</Text>
					<Text style={styles.currentTime}>
						{convertTime(currentAudio.duration)}
					</Text>
				</View>

				<View style={styles.musicController}>
					<TouchableOpacity
						style={styles.optionIconContainer}
						onPress={() => playlistModalRef.current?.open()}>
						<MDIcon name="format-list-bulleted" style={styles.controlIcon} />
					</TouchableOpacity>
					<View style={{ ...styles.innerContainer }}>
						<Image
							resizeMode="contain"
							source={require('../assets/images/music_controls.png')}
							style={styles.background}
						/>
						<TouchableOpacity style={styles.controlIconContainer} onPress={handlePrevious}>
							<MDIcon name="skip-previous" color="white" size={26} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.playContainer} onPress={() => handlePlayPause()}>
							<Image source={require('../assets/images/swirl.png')} style={styles.play} />
							<MDIcon
								name={context.isPlaying ? "pause" : "play-arrow"}
								light
								size={50}
								color="#fff"
								style={styles.playIcon}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.controlIconContainer} onPress={handleNext}>
							<MDIcon name="skip-next" color="white" size={26} />
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={styles.optionIconContainer}>
						<MCIcon name="repeat" style={styles.controlIcon} />
					</TouchableOpacity>
				</View>
				<RenderPlaylistModal refProp={playlistModalRef} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
	},
	headingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width,
		paddingHorizontal: 20,
		paddingTop: 10,
	},
	headingText: {
		fontSize: 16,
		fontFamily: "Montserrat-500"
	},
	contentContainer: {
		flex: 1,
		width,
		marginTop: 40,
		alignItems: "center"
	},
	imageContainer: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		height: width * 0.73 - 30,
		width: width * 0.73 - 30,
		borderRadius: width * 0.4 - 25,
		position: "absolute",
	},
	trackDetailsContainer: {
		width: width - 70,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 40
	},
	trackName: {
		fontSize: 18,
		fontFamily: "Montserrat-500",
		marginTop: 10,
		color: "white",
		letterSpacing: 0.2
	},
	albumName: {
		fontSize: 15,
		marginTop: 7,
		letterSpacing: 0.2,
		fontFamily: "Montserrat-600",
		color: "grey"
	},
	infoContainer: {
		width: width - 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	currentTime: {
		fontFamily: "Montserrat-500",
		fontSize: 16,
		color: "white"
	},
	musicController: {
		width: "100%",
		paddingHorizontal: 25,
		marginTop: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	controlIcon: {
		fontSize: 23,
		color: "white",
	},
	controlIconContainer: {
		width: "30%",
		height: "80%",
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center"
	},
	innerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 75,
		width: "70%",
		alignSelf: "center",
		borderRadius: 30,
	},
	playContainer: {
		alignItems: "center",
		justifyContent: "center",
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: "rgba(0,0,0, .1)"
	},
	background: {
		position: "absolute",
		width: "100%",
		height: "100%",
		top: 0,
		left: 0,
		zIndex: -1
	},
	play: {
		height: 80,
		width: 80,
	},
	playIcon: {
		alignSelf: "center",
		position: "absolute",
	},
	optionIconContainer: {
		width: 50,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	}
});
