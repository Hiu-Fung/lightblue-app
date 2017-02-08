'use strict';

import React, { Component } from 'react';
var PushPayload = require('./PushPayload');
var Blog = require('./Blog');

import {
	Text,
	View,
	ListView,
	ActivityIndicator,
	Image,
	TouchableHighlight

} from 'react-native';

class Feed extends Component {
	constructor(props){
		super(props);

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		})

		this.state = {
			dataSource: ds.cloneWithRows([]),
			// DummyObjects w/ properties seems no longer needed
			// dataSource: ds.cloneWithRows([
			// 	{'actor': { 'login': ''}},
			// 	{'actor': { 'login': ''}},
			// 	{'actor': { 'login': ''}}
			// ]),
			showProgress: true
		}
	}

	componentDidMount(){
		this.fetchFeed();
	}

	fetchFeed(){
		require('./AuthService').getAuthInfo((err, authInfo)=> {
			console.log('authInfo.user.login');
			console.log(authInfo.user.login);
			var url = 'https://api.github.com/users/'
			+ authInfo.user.login
			+'/received_events'

			console.log(url);
			
			fetch(url, {
				headers: authInfo.header
			})
			.then((response)=> response.json())
			.then((responseData)=> {
				var feedItems = 
					responseData.filter((ev)=>
						ev.type == 'IssueCommentEvent');
					console.log('feedItems');
					console.log(responseData);
					console.log(feedItems);
					console.log(feedItems[0].payload);
				this.setState({
					dataSource: this.state.dataSource
						.cloneWithRows(feedItems),
						showProgress: false
				});
			})
		})
	}

    pressRow(rowData){
        console.log(rowData);
		this.props.navigator.replace({
			title: 'Blog',
			component: Blog
		});
        // this.props.navigator.push({
        //     title: 'Push Event',
        //     component: PushPayload,
        //     passProps: {
        //         pushEvent: rowData
        //     }
        // });
    }

	renderRow(rowData){
	        return (
	            <TouchableHighlight
	                onPress={()=> this.pressRow(rowData)}
	                underlayColor='#ddd'
	            >
					<View style={{
		                flex: 1,
		                flexDirection: 'row',
		                padding: 20,
		                alignItems: 'center',
		                borderColor: '#D7D7D7',
		                borderBottomWidth: 1
	            	}}>
		                <Image
	    	                source={{uri: rowData.actor.avatar_url}}
	        	            style={{
	                        height: 36,
	                        width: 36,
	                        borderRadius: 18
	                    	}}
	                	/>
		            	<View style={{
		                    paddingLeft: 20
		                }}>
		                    <Text style={{backgroundColor: '#fff'}}>
		                        {rowData.created_at}
		                    </Text>
	                        <Text style={{backgroundColor: '#fff'}}>
		                        <Text style={{
		                            fontWeight: '600'
		                        	}}>{rowData.actor.login}
		                        </Text> pushed to
							</Text>
		                    <Text style={{backgroundColor: '#fff'}}>
	                        	{rowData.repo.name}
	                    	</Text>
		                    <Text style={{backgroundColor: '#fff'}}>
		                        at <Text style={{
		                            fontWeight: '600'
		                        }}>{rowData.repo.name}</Text>
		                    </Text>
						</View>
					</View>
	            </TouchableHighlight>
        );
	}

	render(){
		console.log('log');
		if(this.state.showProgress){
			return (
				<View style={{
					flex: 1,
					justifyContent: 'center',
                    }}>
					<ActivityIndicator
					size="large"
					animating= {true} />
				</View>
				);
		}
		return (
			<View style={{
				flex: 1,
                paddingTop: 60,
                paddingBottom: 30,
                justifyContent: 'flex-start'
			}}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)} />

			</View>
		);
	}
}

module.exports = Feed;
