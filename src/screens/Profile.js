import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Login() {
	return (
		<View style={styles.container}>
			<Text>Hello from the login Screen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});