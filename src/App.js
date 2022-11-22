import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Axios from 'axios'

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
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem('complexappToken'))
  )
  const [flashMessages, setFlashMessages] = useState([])

  const addFlashMessage = (msg) => {
    setFlashMessages((prev) => prev.concat(msg))
  }

  return (
    <BrowserRouter>
      <FlashMessages messages={flashMessages} />
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path='/' element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path='/post/:id' element={<ViewSinglePost />} />
        <Route
          path='/create-post'
          element={<CreatePost addFlashMessage={addFlashMessage} />}
        />
        <Route path='/about-us' element={<About />} />
        <Route path='/terms' element={<Terms />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
