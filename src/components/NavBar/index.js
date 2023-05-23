import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const NavBar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="nav-container">
      <img
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
      />
      <button onClick={onClickLogout} className="logout-button" type="button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(NavBar)
