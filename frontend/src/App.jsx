import { Routes, Route, BrowserRouter  } from 'react-router-dom'
import { Dashboard } from './page/dashboard'
import { SendMoney } from './page/send.jsx'
import { SignIn } from './page/signin.jsx'
import { SignUp } from './page/signup.jsx'

const App = ()  => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send' element={<SendMoney />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
    
  )

}


export default App;



