import React, { useState } from "react"
import Axios from "axios"

const HeaderLoggedOut = props => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const res = await Axios.post("/login", {
        username,
        password
      })
      if (res.data) {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("username", res.data.username)
        localStorage.setItem("avatar", res.data.avatar)
        props.setLoggedIn(true)
      } else {
        console.log("Incorrect username or password")
      }
    } catch (err) {
      console.log("There was a problem")
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="mb-0 pt-2 pt-md-0">
        <div className="row align-items-center">
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input
              onChange={e => setUsername(e.target.value)}
              name="username"
              className="form-control form-control-sm input-dark"
              type="text"
              placeholder="Username"
              autoComplete="off"
            />
          </div>
          <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
            <input
              onChange={e => setPassword(e.target.value)}
              name="password"
              className="form-control form-control-sm input-dark"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="col-md-auto">
            <button className="btn btn-success btn-sm">Sign In</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HeaderLoggedOut
