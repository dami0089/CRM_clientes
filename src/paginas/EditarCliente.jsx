import Formulario from '../Components/Formulario'
import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const EditarCliente = () => {
  const [cliente,setCliente] = useState({})
  const [cargando,setCargando] = useState (false)
  const {id} = useParams()

  useEffect(() => {
      setCargando(!cargando)
    const obtenerClienteAPI = async () => {
      try {
          const url = `http://localhost:4000/clientes/${id}`
          const respuesta = await fetch (url)
          const resultado = await respuesta.json()
          setCliente(resultado)
      } catch (error) {
          console.log("Hubo un error: " + error)
      }
      setCargando(false)
    }
    obtenerClienteAPI()
  }, [])
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Aqui podras editar a tus clientes</p>
      {cliente?.nombre ? (
        <Formulario
          cliente = {cliente}

      />
      ): <p className='mt-20'>No existe el cliente</p>}
      
    </>
  )
}

export default EditarCliente