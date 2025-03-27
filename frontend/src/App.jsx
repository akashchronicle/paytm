import { Route, Routes } from "react-router-dom"
import Login from '../src/pages/login'
import Signup from '../src/pages/signup'
import { Dashboard } from "./pages/dashboard"
import { SendMoney } from "./pages/send"
function App() {
  
  return (
    <>
   <Routes>
   <Route path='/' element={<Signup/>} />

    <Route path='/signup' element={<Signup/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/send' element={<SendMoney/>} />
   </Routes>
   </>
  )
}

export default App
