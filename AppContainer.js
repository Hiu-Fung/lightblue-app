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
	NavigatorIOS
} from 'react-native';



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
