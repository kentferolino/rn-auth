import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/loginForm';
import AlbumList from './components/albumList'

const App = () => {

	const [loggedIn, setLoggedIn] = useState();

	useEffect(() => {
		firebase.initializeApp({
			apiKey: "AIzaSyACr4WiRD4NOkW0_puKUHiRew5dTmc73Ek",
			authDomain: "authentication-47683.firebaseapp.com",
			databaseURL: "https://authentication-47683.firebaseio.com",
			projectId: "authentication-47683",
			storageBucket: "authentication-47683.appspot.com",
			messagingSenderId: "53459453251",
			appId: "1:53459453251:web:517704e49d3bf192"
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
			}
		})
	}, []);

	const onLogout = () => {
		console.log('Logout clicked')
		firebase.auth().signOut();
	}

	const renderContent = () => {
		switch (loggedIn) {
			case true:
				return (
					<>
						<CardSection>
							<Button onPress={onLogout}>Log out</Button>
						</CardSection>
						<AlbumList />
					</>
				)
			case false:
				return <LoginForm />;
			default:
				return <Spinner size='large' />
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<Header title="Authentication" />
			{renderContent()}
		</View>
	);
}

export default App;
