import { observable, computed } from "mobx";

class ContactStore {

  @observable fetchedContactList = false;

  @observable contactList = [];

  @observable selectedContact = 0;

  @computed get favouriteContacts() {
    return this.contactList.filter(item => item.isFavorite === true);
  }

  @computed get otherContacts() {
    return this.contactList.filter(item => item.isFavorite !== true);
  }

}

export default ContactStore;
