import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', showError: false, errMsg: ''}

  onChangeUsername = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="username" className="label">
          User ID
        </label>
        <input
          className="username"
          type="text"
          id="username"
          placeholder="Enter User ID"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          PIN
        </label>
        <input
          className="username"
          type="password"
          id="password"
          placeholder="Enter PIN"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errMsg => {
    this.setState({showError: true, errMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state

    const userDetails = {userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      ;<Redirect to="/" />
    }
    return (
      <div className="loginContainer">
        <div className="image-loginForm-container">
          <div className="image-container">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
              alt="website login"
            />
          </div>
          <form onSubmit={this.onSubmitForm} className="form-container">
            <h1 className="heading">Welcome Back!</h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showError && <p>{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
