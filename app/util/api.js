import moment from 'moment'
import * as Expo from 'expo'
// noinspection JSAnnotator

const { manifest } = Expo.Constants
const apiUrl = manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(':').shift().concat(':3099')
    : 'production.ocm'
//const apiUrl = '127.0.0.1:3000'
const url = 'http://' + apiUrl + '/v1';


export function getIdToken({email, password}) {
    return fetch('http://' + apiUrl + "/login", {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(response => response.text())
    .then(responseText => JSON.parse(responseText).token)
    .catch(err => console.log(err))
}

export function getEvents() {
    return fetch(url + "/event/1")
        .then(response => response.text())
        .then(responseText => JSON.parse(responseText))
        .then(events => 
            events.map(e => ({
            ...e,id: e.id.toString(), date: new Date(e.date)
        })))
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation on '+url+ ': ' + error.message);
            throw error;
        });
            
}

export function saveEvent({ id, userId, title, date, createdAt }){
    return fetch( url + "/event", {
        method: 'POST',
        body: JSON.stringify({
            "id": parseFloat(id),
            "userId": parseFloat(userId),
            title,
            date,
            createdAt,
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(response => response.text())
    .then(responseText => JSON.parse(responseText))
    .catch(err => console.log(err))
}

export function deleteEvent({ id }) {
    return fetch( url + "/event/"+id, {
        method: 'DELETE',
    })
    .catch(err => console.log(err))
}

export function formatDate(dateString) {
    return moment(dateString).format('D MMM YYYY')
}

export function formatDateTime(dateString) {
    const parsed = moment(new Date(dateString));

    if (!parsed.isValid()) {
        return dateString;
    }

    return parsed.format('H A on D MMM YYYY');
}

export function getCountdownParts(eventDate) {
    const duration = moment.duration(moment(new Date(eventDate)).diff(new Date))
    return {
        days: parseInt(duration.as('days')),
        hours: duration.get('hours'),
        minutes: duration.get('minutes'),
        seconds: duration.get('seconds'),
    }
}