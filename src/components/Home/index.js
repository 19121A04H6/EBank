import Cookies from 'js-cookie'

import NavBar from '../NavBar'

import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  const {history} = props
  if (jwtToken === undefined) {
    history.replace('/ebank/login')
  }
  return (
    <div className="home-container">
      <NavBar />
      <div className="card-container">
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}

export default Home
