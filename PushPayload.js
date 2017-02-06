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

class PushPayload extends Component {
    constructor(props){
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.pushEvent.payload.issue.labels),
            pushEvent: props.pushEvent
        };
    }

    renderRow(rowData){
        console.log('rowData');
        console.log(rowData);
        return(
            <View style={{
                flex: 1,
                justifyContent: 'center',
                borderColor: '#D7D7D7',
                borderBottomWidth: 1,
                paddingTop: 20,
                paddingBottom: 20,
                padding: 10
            }}>
                <Text><Text style={{
                    color: '#' + rowData.color,
                    fontWeight: '800',
                    fontSize: 16
                }}>{rowData.name}</Text> - {rowData.color}</Text>
                <Text>{rowData.url}</Text>
            </View>
        );
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
                    source={{uri: this.state.pushEvent.actor.avatar_url}}
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

                <Text><Text style={styles.bold}>{this.state.pushEvent.actor.login}</Text> pushed to</Text>
                <Text style={styles.bold}>{this.state.pushEvent.repo.name}</Text>


                <ListView
                    contentInset={{
                        top: -50
                    }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    bold: {
        fontWeight: '800',
        fontSize: 16
    }
});

module.exports = PushPayload;
















