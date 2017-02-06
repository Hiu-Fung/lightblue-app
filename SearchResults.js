'use strict';

import React, { Component } from 'react';
var RepoDetails = require('./RepoDetails');

import {
	Text,
	View,
	ListView,
	ActivityIndicator,
	Image,
	TouchableHighlight,
    StyleSheet
} from 'react-native';

class SearchResults extends Component {
	constructor(props){
		super(props);

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 != r2
		})

		this.state = {
			dataSource: ds,
            showProgress: true,
            searchQuery: props.searchQuery
		}
        console.log('props.searchQuery');
        console.log(props.searchQuery);
	}

	componentDidMount(){
		this.doSearch();
	}

    doSearch(){
		console.log('doing search for '+ this.state.searchQuery);
        var url = 'https://api.github.com/search/repositories?q=' +
            encodeURIComponent(this.state.searchQuery);

        fetch(url)
            .then((response)=> response.json())
            .then((responseData)=> {
                console.log('then2');
                console.log(responseData);
                this.setState({
                    repositories: responseData.repositories,
                    dataSource: this.state.dataSource.cloneWithRows(responseData.items)
                });
            })
        .finally(()=> {
                this.setState({
                    showProgress: false
                });
            });
	}

    pressRow(rowData){
        console.log(rowData);
        this.props.navigator.push({
            title: 'Repo',
            component: RepoDetails,
            passProps: {
                pushEvent: rowData
            }
        });
    }

	renderRow(rowData){
	        return (
	            <TouchableHighlight
	                onPress={()=> this.pressRow(rowData)}
	                underlayColor='#ddd'
	            >
					<View style={{
                        padding: 20,
                        borderColor: '#D7D7D7',
                        borderBottomWidth: 1,
                        backgroundColor: '#fff'
	            	}}>
		                <Text
	    	                style={{
                                fontSize: 20,
                                fontWeight: '600'
	                    }}>
                        {rowData.full_name}
                        </Text>
                        <Text style={{backgroundColor: '#fff'}}>
                            by <Text style={{
                                fontWeight: '600'
                            }}>{rowData.owner.login}</Text>
                        </Text>
		            	<View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20
                        }}>
                            <View style={styles.repoCell}>
		                        <Image source={require('image!star')}
                                    style={styles.repoCellIcon}
                                />
                                <Text style={styles.repoCellLabel}>
		                        {rowData.stargazers_count}
                                </Text>
                            </View>
                            <View style={styles.repoCell}>
                                <Image source={require('image!fork')}
                                    style={styles.repoCellIcon}
                                />
                                <Text style={styles.repoCellLabel}>
		                        {rowData.forks_count}
                                </Text>
                            </View>
                            <View style={styles.repoCell}>
                                <Image source={require('image!issues2')}
                                    style={styles.repoCellIcon}
                                />
                                <Text style={styles.repoCellLabel}>
		                        {rowData.open_issues}
                                </Text>
                            </View>
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
					justifyContent: 'center'
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

const styles = StyleSheet.create({
    repoCell: {
        width: 50,
        alignItems: 'center'
    },
    repoCellIcon: {
        width: 20,
        height: 20
    },
    repoCellLabel: {
        textAlign: 'center'
    }
});

module.exports = SearchResults;
