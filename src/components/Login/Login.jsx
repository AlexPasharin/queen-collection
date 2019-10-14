import React, { useContext, useState } from 'react'

import "../../styles/Login.css"

import { authContext } from "../../context/AuthContext"
import { login as loginRequest } from '../../utils/apiCalls'

const Login = ({ history }) => {
  const [inputValue, setInputValue] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const { login } = useContext(authContext)

  const onInputChange = e => {
    setLoginError(false)
    setInputValue(e.target.value)
  }

  const onLogin = e => {
    e.preventDefault()

    setSubmitting(true)

    loginRequest(inputValue)
      .then(({ authenticated }) => {
        setSubmitting(false)

        if (authenticated) {
          login()
          history.push("/entries")
        } else {
          setLoginError(true)
        }
      })
  }

  return (
    <form className="login-input" onSubmit={onLogin}>
      <input autoFocus type="password" placeholder="Password" value={inputValue} onChange={onInputChange} />
      <button type="submit">Log in</button >
      {submitting && "Submitting..."}
      {loginError && "Failed to authorize"}
    </form>
  )
}

export default Login
