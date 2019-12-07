import React, { useContext, useState } from 'react'

import { authContext } from "../../context/AuthContext"
import { login as loginRequest } from '../../utils/apiCalls'

import "../../styles/Login.css"

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
      login(inputValue)
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
