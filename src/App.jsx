import Inicio from './views/Inicio'
import CreateFood from './views/CreateFood'
import EditFood from './views/EditFood'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/*' element={<Inicio/>}></Route>
        <Route path='/create' element={<CreateFood/>}></Route>
        <Route path='/edit/:id' element={<EditFood/>}></Route>
      </Routes>
    </>
  )
}

export default App
