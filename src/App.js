import { useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Axios from 'axios'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

import Header from './components/Header'
import Home from './components/Home'
import HomeGuest from './components/HomeGuest'
import Footer from './components/Footer'
import Terms from './components/Terms'
import About from './components/About'
import CreatePost from './components/CreatePost'
import ViewSinglePost from './components/ViewSinglePost'
import FlashMessages from './components/FlashMessages'

Axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('complexappToken')),
    flashMessages: []
  }

  const ourReducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return { loggedIn: true, flashMessages: state.flashMessages }
      case 'logout':
        return { loggedIn: false, flashMessages: state.flashMessages }
      case 'flashMessage':
        return {
          loggedIn: state.loggedIn,
          flashMessages: state.flashMessages.concat(action.value)
        }
      default:
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route
              path='/'
              element={state.loggedIn ? <Home /> : <HomeGuest />}
            />
            <Route path='/post/:id' element={<ViewSinglePost />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/terms' element={<Terms />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
