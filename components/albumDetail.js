import React from 'react';
import {
	Image,
	Text,
	View,
	Dimensions,
	Linking
} from 'react-native';
import { Card, CardSection, Button } from './common';

const AlbumDetail = ({ album }) => {
	const {
		artist,
		image,
		thumbnail_image,
		title,
		url
	} = album;
	const {
		headerContainer, headerTextStyle, imageStyle, thumbnailStyle, thumbnailContainerStyle
	} = styles;

	return (
		<Card>
			<CardSection>
				<View style={thumbnailContainerStyle}>
					<Image source={{ uri: thumbnail_image }} style={thumbnailStyle} />
				</View>
				<View style={headerContainer}>
					<Text style={headerTextStyle}>{title}</Text>
					<Text>{artist}</Text>
				</View>
			</CardSection>
			<CardSection>
				<View>
					<Image source={{ uri: image }} style={imageStyle} />
				</View>
			</CardSection>
			<CardSection>
				<Button onPress={() => Linking.openURL(url)}>
					Buy now
        </Button>
			</CardSection>
		</Card>
	);
};

const styles = {
	headerContainer: {
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	headerTextStyle: {
		fontSize: 18,
	},
	imageStyle: {
		height: 300,
		flex: 1,
		width: Dimensions.get('window').width - 23,
	},
	thumbnailStyle: {
		height: 50,
		width: 50
	},
	thumbnailContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
		marginLeft: 10,
	},
};

export default AlbumDetail;
