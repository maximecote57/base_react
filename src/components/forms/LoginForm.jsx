import React from "react";
import Validator from 'validator';
import InlineError from "../messages/InlineError"
import PropTypes from 'prop-types';

class LoginForm extends React.Component {

    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => this.setState({
        data : {...this.state.data, [e.target.name]: e.target.value }
    })

    onSubmit = e => {

        e.preventDefault()

        const errors = this.validate(this.state.data);
        this.setState({errors});

        if (Object.keys(errors).length === 0) {
            this.props.submit(this.state.data);
        }

    }

    validate = data => {
        const errors = {};

        if (!Validator.isEmail(data.email)) {
            errors.email = "Invalid email";
        }

        if (!data.password) {
            errors.password = "Can't be blank";
        }

        return errors;

    }

    render() {
        const { data, errors } = this.state;

        return (
            <form className="form" onSubmit={this.onSubmit}>
                <div className="form__field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="example@example.com" value={data.email} onChange={this.onChange}/>
                    {errors.email && <InlineError text={errors.email} />}
                </div>
                <div className="form__field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Make it secure" value={data.password} onChange={this.onChange}/>
                    {errors.password && <InlineError text={errors.password} />}
                </div>
                <button type="submit">Login</button>
            </form>
        )
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default LoginForm;