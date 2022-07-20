import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import EditarCliente from './paginas/EditarCliente'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import VerCliente from './paginas/VerCliente'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/clientes' element={<Layout/>}>
          <Route index element={<Inicio/>}/>
          <Route path='nuevo' index element={<NuevoCliente/>}/>
          <Route path='editar/:id' index element={<EditarCliente/>}/>
          <Route path=':id' index element={<VerCliente/>}/>



        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
