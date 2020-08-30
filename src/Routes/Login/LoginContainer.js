import React from "react";
import LoginPresenter from "./LoginPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
    };
  }

  onSubmit = (email, password) => {
    this.setState({ email: email, password: password });
  };

  render() {
    const { email, password } = this.state;
    console.log(email, password);

    return <LoginPresenter onSubmit={this.onSubmit} />;
  }
}
