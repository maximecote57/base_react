import React from "react";
import LoginForm from "../forms/LoginForm"

class LoginPage extends React.Component {

    submit = () => {}

    render() {
        return (
            <div className="component">
                <h1>Login</h1>
                <LoginForm submit={this.submit}/>
            </div>
        );
    }
}

export default LoginPage;