import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import ErrorPage from './page/error.jsx'
import { Dashboard } from './page/dashboard'
import { SendMoney } from './page/send.jsx'
import { SignIn } from './page/signin.jsx'
import { SignUp } from './page/signup.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<ErrorPage />}/>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sendMoney' element={<SendMoney />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    
    </>
    
  )
}

export default App
