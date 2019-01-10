import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, TouchableHighlight } from 'react-native';
import ActionButton from 'react-native-action-button'

import EventCard from '../component/EventCard'
import EventFormModal from './EventFormModal'
import { getEvents } from '../util/api'


class Events extends Component {

    state = {
        events: [],
        modalVisible: false
    }

    componentDidMount() {

        setInterval(() => {
            this.setState({
                events: this.state.events.map(evt => ({
                    ...evt, timer: Date.now()
                }))
            })
        }, 1000)

        this.props.navigation.addListener('didFocus', () => {
            getEvents()
            .then(events => this.setState({ events }))
            .catch((error)=>{
                console.log("Api call error");
                //alert("The app is under maintenance!!!");
            });
        })
    }

    handleAddEvent = () => {
        alert("TShow edit form");
    }

    handleEditEvent = (event) => {
        event["isNew"] = false 
        this.props.navigation.navigate('form', {event: event})
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return [
            <FlatList
                key="fList"
                style={styles.list}
                data={this.state.events}
                renderItem={({item}) => (
                    <TouchableHighlight
                        onPress={() => this.handleEditEvent(item)}>
                    <EventCard event={item} />
                    </TouchableHighlight>
                    )}
                keyExtractor={item => item.id}
            />,
            <ActionButton
                key="fab"
                onPress={() => this.setModalVisible(true)}
                buttonColor="rgba(231, 76, 60, 1)"
            />,
            <EventFormModal 
                key="efm"
                modalVisible = {this.state.modalVisible}
                setModalVisible={() => {
                    this.setModalVisible(!this.state.modalVisible);
                }} 
                isNew={true}
            />

        ]
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f3f3f3'
    }
})

export default Events