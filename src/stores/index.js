import UIStore from "./ui";
import ContactStore from "./contact";
import { create } from "mobx-persist";
import clientPersist from "client-persist";
import ContactStore from "./contact";

class Store {
  constructor() {
    this.ui = new UIStore(this);
    this.contact = new ContactStore(this);
  }
}

const store = new Store();
export default store;

clientPersist.setDriver(clientPersist.SESSIONSTORAGE);

const hydrate = create({
  storage: clientPersist
});

const p1 = hydrate("hello", store.ui);

Promise.all([p1]).then(() => {
  console.log("Hydration complete");
  store.ui.fetchedFromPersist = true;
});
