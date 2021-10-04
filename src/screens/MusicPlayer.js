import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar, Image, Platform } from 'react-native';
import SVG, { Circle } from "react-native-svg"
import SampleImageCover from "../assets/images/playlist_cover1.png"
import MDIcon from "react-native-vector-icons/MaterialIcons"
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTheme } from '@react-navigation/native';
import Background from '../components/Background';
import Constants from 'expo-constants';



const { width } = Dimensions.get('screen')
export default function MusicPlayer({ navigation, ...props }) {
	const { colors, dark } = useTheme()


	return (
		<View style={{ ...styles.container, backgroundColor: colors.primary }}>
			<Background />
			<View style={styles.headingContainer}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<MDIcon name="chevron-left" size={30} color="white" />
				</TouchableOpacity>
				<Text style={{ ...styles.headingText, color: colors.background }}>Now Playing</Text>
				<TouchableOpacity>
					<MDIcon name="more-vert" size={30} color="white" />
				</TouchableOpacity>
			</View>
			<View style={styles.contentContainer}>
				<AnimatedCircularProgress
					size={width * 0.73}
					width={6}
					fill={100}
					duration={360000}
					tintColor={colors.brown}
					tintColorSecondary="black"
					style={{ marginTop: 20 }}
					onAnimationComplete={() => console.log('onAnimationComplete')}
					padding={10}
					renderCap={({ center }) =>
						<Circle
							cx={center.x}
							cy={center.y}
							r="7"
							fill="white"
							stroke="rgba(46, 47, 49)"
							strokeWidth="3"
						/>}
					backgroundColor="rgba(234, 235, 237)"
					children={() => <Image
						resizeMode="cover"
						style={styles.image}
						source={SampleImageCover}
					/>}
				/>
				<View style={styles.trackDetailsContainer}>
					<Text style={styles.trackName}>Shapeshifter</Text>
					<Text style={styles.albumName}>Alessia Cara</Text>
				</View>
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
	image: {
		height: width * 0.73 - 50,
		width: width * 0.73 - 50,
		borderRadius: width * 0.4 - 25,
	},
	trackDetailsContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	trackName: {
		fontSize: 24,
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
	}
});
