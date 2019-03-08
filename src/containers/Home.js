import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class Home extends Component {
  render() {
    const { ui } = this.props.store;
    return (
      <Fragment>
        <div className="box">Hello World {ui.hello}</div>
        <input
          value={ui.hello}
          onChange={e => {
            ui.hello = e.target.value;
          }}
        />
      </Fragment>
    );
  }
}
