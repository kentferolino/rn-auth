import React, { useState } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common'

const LoginForm = () => {

	const { errorTextStyle } = styles;
	const [formValues, setFormValues] = useState({ username: '', password: '' })

	const { username, password } = formValues;
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const onLogin = () => {

		setError('');
		setLoading(true);

		firebase.auth().signInWithEmailAndPassword(username, password)
			.then(onLoginSuccess())
			.catch((error1) => {
				firebase.auth().createUserWithEmailAndPassword(username, password)
					.then(onLoginSuccess())
					.catch((error2) => {
						console.log('Error')
						setError('Authentication Failed.');
						setLoading(false);
					});
			});
	}

	const onLoginSuccess = () => {
		debugger;
		console.log('Success')
		setError('');
		setLoading(false);
		setFormValues({ username: '', password: '' })
	}

	const renderButton = () => {
		if (loading) {
			return <Spinner size='small' />
		}
		return <Button onPress={onLogin}>Log in</Button>
	}

	return (
		<Card>
			<CardSection>
				<Input
					placeholder='username'
					label='Username'
					value={username}
					onChangeText={value =>
						setFormValues({
							...formValues,
							username: value
						})}
				/>
			</CardSection>
			<CardSection>
				<Input
					secureTextEntry
					placeholder='password'
					label='Password'
					value={password}
					onChangeText={value =>
						setFormValues({
							...formValues,
							password: value
						})}
				/>
			</CardSection>
			<Text style={styles.errorTextStyle}>{error}</Text>
			<CardSection>
				{renderButton()}
			</CardSection>
		</Card>
	);
};

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
}

export default LoginForm;

