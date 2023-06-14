
import Myform from './components/AttendanceFrontEnd/'
import {Theme} from '@carbon/react'
import './App.scss'
function App() {

  return (
    <>
    <Theme theme='g100'>
        <h1 style={{marginTop:"2rem",marginBottom:"2rem",textAlign:"center"}}>Attendance Tracker</h1>
        <Myform></Myform>
        </Theme>
    </>
  )
}

export default App;
