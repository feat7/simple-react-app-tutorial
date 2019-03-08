import { observable } from "mobx";

class ContactStore {
  @observable contactList = [];
}

export default ContactStore;
