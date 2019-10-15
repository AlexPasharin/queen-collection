import * as Cookies from 'js-cookie'
import React, { useContext, useState } from 'react'

import "../../styles/Login.css"

import { authContext } from "../../context/AuthContext"
import { login as loginRequest } from '../../utils/apiCalls'

const Login = ({ history }) => {
  const [inputValue, setInputValue] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const { authenticated, login } = useContext(authContext)

  if (authenticated) {
    history.push("/entries")
  }

  const onInputChange = e => {
    setLoginError(false)
    setInputValue(e.target.value)
  }

  const onLogin = async e => {
    e.preventDefault()

    setSubmitting(true)
    const { authenticated } = await loginRequest(inputValue)

    if (authenticated) {
      Cookies.set(process.env.REACT_APP_COOKIE_NAME, inputValue, { expires: 7 })
      login()
    } else {
      setLoginError(true)
    }

    setSubmitting(false)
  }

  return (
    <form className="login-input" onSubmit={onLogin}>
      <input autoFocus type="password" placeholder="Password" value={inputValue} onChange={onInputChange} />
      <button type="submit">Log in</button >
      {!loginError && submitting && "Submitting..."}
      {loginError && "Failed to authorize"}
    </form>
  )
}

export default Login
