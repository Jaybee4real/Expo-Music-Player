import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { setFirstLanch } from '../../utils/auth';
import Background from '../../components/Background';

export default function Welcome({ navigation, ...props }) {
	const { colors } = useTheme()

	const navigateToApp = async () => {
		await setFirstLanch();
		navigation.navigate('HomeScreen');
	}

	return (
		<View style={{ ...styles.container, backgroundColor: 'black' }}>
			<Background />
			<Image source={require('../../assets/images/HeadphoneImage.png')} style={styles.image} />
			<Text style={styles.headingText}>Music Player</Text>
			<Text style={styles.subheadingText}>
				Welcome to the Music Player, press the button below to continue
			</Text>
			<TouchableOpacity style={{ marginTop: "auto" }} onPress={navigateToApp}>
				<Image style={styles.continueButton} source={require('../../assets/images/continueButton.png')} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		height: 150,
		width: 150,
		marginTop: "auto"
	},

	headingText: {
		fontFamily: 'Montserrat-700',
		fontSize: 25,
		marginTop: 30,
		color: "white"
	},
	subheadingText: {
		fontFamily: 'Montserrat-500',
		color: 'white',
		fontSize: 16.5,
		marginTop: 10,
		textAlign: 'center',
		maxWidth: "80%",
		lineHeight: 25
	},
	continueButton: {
		marginTop: "auto",
		marginBottom: 50,
		height: 80,
		width: 80
	}
});