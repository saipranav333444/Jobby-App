import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')

  // If the token does NOT exist, redirect to login
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  // If the token exists, allow the user to access the protected route
  return <Route {...props} />
}

export default ProtectedRoute
