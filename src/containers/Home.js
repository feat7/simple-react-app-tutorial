import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { getContacts } from "../utils/contact";

@inject("store")
@observer
export default class Home extends Component {

  renderContactList() {
    const { contact } = this.props.store;
    return (
      <Fragment>
        <h2 className="subtitle">
          {contact.contactList.map((item, index) => {
            return (
              <div class="box" key={index} onClick={() => {
                contact.selectedContact = index;
              }}>
                {item.name}
              </div>
            )
          })}
        </h2>
      </Fragment>
    )
  }

  renderContactDetail() {
    const { contact } = this.props.store;
    const currentContact = contact.contactList[contact.selectedContact];
    return (
      <div className="box">
        {currentContact.name}
      </div>
    );
  }

  render() {
    const { contact } = this.props.store;
    if (!contact.fetchedContactList) {
      getContacts(this.props.store);
      return (
        <div className="title is-info">Loading...</div>
      );
    }
    return (
      <Fragment>
        <div className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="title is-3">Contact List</div>
              <div className="columns">
                <div className="column is-one-third">
                  {this.renderContactList()}
                </div>
                <div className="column is-two-third">
                  {this.renderContactDetail()}
                </div>
              </div>
            </div>
          </div>
        </div>

      </Fragment>
    );
  }
}
