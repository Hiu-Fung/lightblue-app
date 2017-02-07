'use strict';

// var React = require('react-native');
//
// var {
// 	Text,
// 	View,
// 	Component,
// 	StyleSheet,
// 	TabBarIOS,
// 	NavigatorIOS
// } = React;


import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TabBarIOS,
	NavigatorIOS,
	DeviceEventEmitter
} from 'react-native';

var Beacons = require('react-native-ibeacon');

// Define a region which can be identifier + uuid,
// identifier + uuid + major or identifier + uuid + major + minor
// (minor and major properties are numbers)
var region = {
	identifier: 'Estimotes',
	uuid: '10F86430-1346-11E4-9191-0800200C9A66'
	// uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
	// e20a39f4-73f54bc4-a12f-17d1ad07a961 From raspberry forum
};

// Request for authorization while the app is open
Beacons.requestWhenInUseAuthorization();

Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

// Listen for beacon changes
var subscription = DeviceEventEmitter.addListener(
	'beaconsDidRange',
	(data) => {
		console.log('beaconsDidRange');
		console.log(data.region.identifier);
		console.log(data.region.uuid);

		// data.region - The current region
		// data.region.identifier
		// data.region.uuid

		// data.beacons - Array of all beacons inside a region
		//  in the following structure:
		//    .uuid
		//    .major - The major version of a beacon
		//    .minor - The minor version of a beacon
		//    .rssi - Signal strength: RSSI value (between -100 and 0)
		//    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
		//    .accuracy - The accuracy of a beacon
	}
);


var Feed = require('./Feed');
var Search = require('./Search');
var Blog = require('./Blog');

class AppContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			selectedTab: 'feed'
		}
	}

	render(){
		return (
			<TabBarIOS style={styles.container}>
				<TabBarIOS.Item
					title="Feed"
					selected={this.state.selectedTab == 'feed'}
					icon={require('image!inbox')}
					onPress={()=> this.setState({selectedTab: 'feed'})}
				>
	                <NavigatorIOS
	                    style={{
	                        flex: 1
	                    }}
	                    initialRoute={{
	                        component: Feed,
	                        title: 'Feed'
	                    }}
	                />
                </TabBarIOS.Item>
				<TabBarIOS.Item
					title="Search"
					selected={this.state.selectedTab == 'search'}
					icon={require('image!search')}
					onPress={()=> this.setState({selectedTab: 'search'})}
				>
                    <NavigatorIOS
                        style={{
                            flex: 1
                        }}
                        initialRoute={{
                            component: Search,
                            title: 'Search'
                        }}
                    />
                </TabBarIOS.Item>
				<TabBarIOS.Item
					title="Blog"
					selected={this.state.selectedTab == 'blog'}
					icon={require('image!search')}
					onPress={()=> this.setState({selectedTab: 'blog'})}
				>
					<NavigatorIOS
						style={{
                            flex: 1
                        }}
						initialRoute={{
                            component: Blog,
                            title: 'Blog'
                        }}
					/>
				</TabBarIOS.Item>
			</TabBarIOS>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});

module.exports = AppContainer;
