import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button } from 'react-native-elements';

const Marker = MapView.Marker;

export default class Map extends Component {
	state = {
		region: null,
		currentPage: false
	};

	renderMarkers() {
		let result = [];
		let closed = '';
		this.props.places.forEach((place, i) => {
			if (place.closed === false) {
				closed = 'Currently Opened';
			} else {
				closed = 'Currently Closed';
			}
			if (!place.price) {
				place.price = 'Price Unavaiable';
			}
			result.push(
				<Marker
					key={i}
					pinColor="blue"
					description={place.phone}
					title={place.name}
					coordinate={place.coords}
					onPress={this.showDescription}
					identifier={place.id}
					onPress={() => {
						this.props.getDetail(place.id);
					}}
				/>
			);
		});
		return result;
	}

	showDescription(e) {
		console.log(e.nativeEvent.id);
	}

	onRegionChange(region) {
		this.setState({ region }, () => {
			console.log(this.state.region);
		});
	}

	searchThisArea() {
		this.props.function(this.state.region);
	}

	render() {
		const { region } = this.props;
		return (
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.container}
					initialRegion={region}
					showsUserLocation
					showsMyLocationButton
					onRegionChange={this.onRegionChange.bind(this)}
				>
					{this.renderMarkers()}
				</MapView>
				<Button
					onPress={this.searchThisArea.bind(this)}
					style={styles.button}
					color="#fff"
					title="Search This Area"
				/>
				<Button
					title="Favorite"
					style={{ position: 'relative', bottom: 800, left: 160 }}
				/>
			</View>
		);
	}
}

const styles = {
	container: {
		alignSelf: 'stretch',
		height: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	overlay: {
		position: 'absolute',
		bottom: 50
	},
	button: {
		position: 'abosulte',
		bottom: 725,
		opacity: 0.4
	}
};
