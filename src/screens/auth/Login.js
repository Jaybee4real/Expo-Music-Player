import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { loginSuccess } from '../../store/auth';

export default function Login({ navigation, ...props }) {
	const dispatch = useDispatch()
	return (
		<View style={styles.container}>
			<Text>Hello from the login Screen</Text>
			<CustomButton
				label="Show Signup"
				buttonStyles={{ width: "80%" }}
				onPress={() => navigation.push('Signup')}
			/>
			<CustomButton
				label="Sign In"
				buttonStyles={{ width: "80%" }}
				onPress={() => dispatch(loginSuccess({ userData: {} }))}
			/>
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