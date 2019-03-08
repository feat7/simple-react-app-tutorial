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
        <h2 className="card card-content has-text-centered has-border  has-background-light">
          Favourite Contacts
        </h2>
        <div>
          {contact.favouriteContacts.map((item, index) => {
            return (
              <a key={index}>
                <div className="card card-content card-body" onClick={() => {
                  contact.selectedContact = item.id;
                }}>
                  Favourite<br />
                  {item.name}<br />
                  <div className="has-text-grey">{item.companyName}</div>
                </div>
              </a>
            )
          })}
        </div>
        <h2 className="card card-content has-text-centered has-border  has-background-light">
          Other Contacts
        </h2>
        <div>
          {contact.otherContacts.map((item, index) => {
            return (
              <div className="card card-content card-body is-hoverable" key={index} onClick={() => {
                contact.selectedContact = item.id;
              }}>
                {item.name}<br />
                <div className="has-text-grey">{item.companyName}</div>
              </div>
            )
          })}
        </div>
      </Fragment>
    )
  }

  renderContactDetail() {
    const { contact } = this.props.store;
    const currentContact = contact.contactList.find((item) => parseInt(item.id, 10) === parseInt(contact.selectedContact, 10));
    return (
      <Fragment>
        <h2 className="card card-content has-text-centered has-border has-background-light">
          Contact Detail
        </h2>
        <div className="card card-content">
          <div className="title has-text-centered">{currentContact.name}</div>
          <div className="subtitle has-text-centered has-text-grey">{currentContact.companyName}</div>
          <hr />
          {
            Object.entries(currentContact.phone).map(([key, value], index) => {
              return (
                <div className="card card-content" key={index}>
                  <div className="title is-6">Phone</div>
                  <hr />
                  <div className="columns">
                    <div className="column">
                      {value}
                    </div>
                    <div className="column has-text-right has-text-grey">
                      {key.toUpperCase()}
                    </div>
                  </div>
                </div>);
            })}
          <div className="card card-content">
            <div className="title is-6">Address</div>
            <hr />
            {currentContact.address.street}<br />
            {currentContact.address.city}{" "}
            {currentContact.address.state}{" "}
            {currentContact.address.country}{" "}
            {currentContact.address.zipCode}{" "}
          </div>
          <div className="card card-content">
            <div className="title is-6">Birthdate</div>
            <hr />
            {currentContact.birthdate}
          </div>
          <div className="card card-content">
            <div className="title is-6">Email</div>
            <hr />
            {currentContact.emailAddress}
          </div>
        </div>

      </Fragment>
    );
  }

  render() {
    const { contact } = this.props.store;
    if (!contact.fetchedContactList) {
      getContacts(this.props.store);
      return (
        <div className="hero hero-body container has-text-centered title has-text-info">Loading...</div>
      );
    }
    return (
      <Fragment>
        <div className="hero">
          <div className="hero-body">
            <div className="container">
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
