import axios from 'axios';
import { runInAction } from 'mobx';
import { API_SERVER } from '../config';

export const getContacts = (store) => {
    const { ui, contact } = store;
    axios.get(`${API_SERVER}/technical-challenge/v3/contacts.json`).then(response => runInAction(() => {
        ui.isLoading = false;
        contact.contactList = response.data;
        contact.fetchedContactList = true;
        console.log(response.data)
    })).catch(e => runInAction(() => {
        ui.isLoading = false;
        console.log(e.message)
    }))
}