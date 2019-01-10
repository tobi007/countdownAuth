import React, { Component } from 'react'
import { View, Text, TouchableHighlight, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDateTime, saveEvent, deleteEvent } from './api';

class EventForm extends Component {

    state = this.props.navigation.state.params.event

    handleAddPress = () => {
        saveEvent(this.state)
        .then(() => {
            setTimeout(() => {}, 500)
        })
        .then(() => this.props.navigation.navigate('list'))
    }

    handleDeletePress = () => {
        deleteEvent(this.state)
        .then(() => {
            setTimeout(() => {}, 500)
        })
        .then(() => this.props.navigation.navigate('list'))
    }

    handleChangeTitle = (value) => {
        this.setState({ title: value }) 
    }

    handleDatePress = () => {
        this.setState({ showDatePicker: true })
    }

    handleDatePicked = (date) => {
        this.setState({ 
            date 
        })
        this.handleDatePickerHide();
    }

    handleDatePickerHide = () => {
        this.setState({ showDatePicker: false })
    }

    render() {
        // debugger
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <View style={styles.fieldContainer}>
                    <TextInput 
                        style={styles.text}
                        placeholder="Event Title"
                        spellCheck={false}
                        value={this.state.title}
                        onChangeText={this.handleChangeTitle}
                    />   
                    <TextInput
                        style={[styles.text, styles.borderTop]}
                        placeholder="Event Date"
                        spellCheck={false}
                        value={formatDateTime(this.state.date.toString())}
                        editable={!this.state.showDatePicker}
                        onFocus={this.handleDatePress}
                    /> 
                    <DateTimePicker 
                        isVisible={this.state.showDatePicker}
                        mode='datetime'
                        onConfirm={this.handleDatePicked}
                        onCancel={this.handleDatePickerHide}
                    />
                </View>
                {this.state.isNew && 
                    <TouchableHighlight 
                        onPress={this.handleAddPress}     
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Add</Text> 
                    </TouchableHighlight>
                }
                {!this.state.isNew && 
                    <TouchableHighlight 
                        onPress={this.handleAddPress}     
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Edit</Text> 
                    </TouchableHighlight>
                }
                {!this.state.isNew && 
                    <TouchableHighlight 
                        onPress={this.handleDeletePress}     
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Delete</Text> 
                    </TouchableHighlight>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create ({ 
    fieldContainer: {
        margin: 20,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    text: {
        height: 40,
        margin: 0,
        marginRight: 7,
        paddingLeft: 10,
        backgroundColor: "#a3a3a3"
    },
    button: {
        height: 50,
        backgroundColor: '#48bbec',
        borderColor: '#48bbec',
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    borderTop: {
        borderColor: '#edeeef',
        borderTopWidth: 0.5
    }
})

export default EventForm; 