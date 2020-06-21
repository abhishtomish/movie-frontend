import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

export class Login extends Component {

    state = {
        credentials: {
            username: '',
            password: ''
        },
        isLoginView: true
    }

    inputChanged = event => {
        let cred = this.state.credentials
        cred[event.target.name] = event.target.value
        this.setState({credentials: cred})
    }

    login = event => {

        if (this.state.isLoginView){
            fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.credentials)
            }).then(resp => resp.json())
            .then(res => {
                console.log(res.token)
                this.props.cookies.set('mr-token', res.token)
                window.location.href = "/movies"
            })
            .catch(error => console.log(error))
        }else {
            fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.credentials)
            }).then(resp => resp.json())
            .then(res => {
                this.setState({
                    isLoginView: true
                })
            })
            .catch(error => console.log(error))
        }

        
    }

    toggleView = () => {
        this.setState({
            isLoginView: !this.state.isLoginView
        })
    }

    render() {
        return (
            // <div className="login-bg">
            //     <h1>
            //             {this.state.isLoginView ? 'Login' : 'Register'}
            //         </h1>
            //     <div className="login-container">
            //         <div>
            //             <input type="text" name="username" value={this.state.credentials.username} 
            //             onChange={this.inputChanged}
            //             />
            //             <label for="username"><span className="content-name">Username</span></label>
            //         </div>
            //         {/* <div>
            //             <input type="password" name="password" value={this.state.credentials.password} 
            //             onChange={this.inputChanged}
            //             />
            //             <label for="password"><span className="content-password">Password</span></label>
            //         </div> */}
            //         <button onClick={this.login}>
            //             {this.state.isLoginView ? 'Login' : 'Register'}
            //         </button>
            //         <p onClick={this.toggleView}>
            //             {this.state.isLoginView ? 'Create Account' : 'Back to Login'}
            //         </p>
            //     </div>
            // </div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                        <div className="login100-form validate-form">
                            <span className="login100-form-title p-b-55">
                                {this.state.isLoginView ? 'Login' : 'Register'}
                            </span>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid username is required: ex@abc.xyz">
                                <input className="input100" type="text" name="username" value={this.state.credentials.username} onChange={this.inputChanged} placeholder="username" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-envelope"></span>
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid username is required: ex@abc.xyz">
                                <input className="input100" type="password" name="password" value={this.state.credentials.password} onChange={this.inputChanged} placeholder="password" />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <span className="lnr lnr-envelope"></span>
                                </span>
                            </div>
                            <div className="container-login100-form-btn p-t-25">
                            <div className="container-login100-form-btn p-t-25">
						        <button className="login100-form-btn" onClick={this.login}>
                                    {this.state.isLoginView ? 'Login' : 'Register'}
						        </button>
					        </div>
                            </div>
                            <p onClick={this.toggleView}>
                                {this.state.isLoginView ? 'Create Account' : 'Back to Login'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withCookies(Login)
