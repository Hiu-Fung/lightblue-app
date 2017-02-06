'use strict';

import React, { Component } from 'react';

import {
    Text,
    View,
    ListView,
    Image,
    StyleSheet
} from 'react-native';

// var moment = require('moment.js');

class RepoDetails extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            pushEvent: props.pushEvent
        };
    }

    render(){
        return (
            <View style={{
                flex: 1,
                paddingTop: 80,
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1
            }}>
                <Image
                    source={{uri: this.state.pushEvent.owner.avatar_url}}
                    style={{
                        height: 120,
                        width: 120,
                        borderRadius: 60
                    }}
                />

                <Text style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    fontSize: 20
                }}>
                    {this.state.pushEvent.created_at}
                </Text>

                <Text> Repository name: <Text style={styles.bold}>{this.state.pushEvent.description}</Text></Text>
                <Text>by <Text style={styles.bold}>{this.state.pushEvent.owner.login}</Text></Text>
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
		                        {this.state.pushEvent.stargazers_count}
                        </Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Image source={require('image!fork')}
                            style={styles.repoCellIcon}
                        />
                        <Text style={styles.repoCellLabel}>
		                        {this.state.pushEvent.forks_count}
                        </Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Image source={require('image!issues2')}
                            style={styles.repoCellIcon}
                        />
                        <Text style={styles.repoCellLabel}>
		                        {this.state.pushEvent.open_issues}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    bold: {
        fontWeight: '800',
        fontSize: 16
    },
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

module.exports = RepoDetails;
















