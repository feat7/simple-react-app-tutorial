import { observable } from "mobx";

class ContactStore {

  @observable fetchedContactList = false;

  @observable contactList = [];

  @observable selectedContact = 0;

}

export default ContactStore;
