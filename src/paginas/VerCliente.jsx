import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const VerCliente = () => {
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
    Object.keys(cliente).length === 0 ? <p>No hay Resultados</p> : (
    <div>   
        {cargando ? 'Cargando...' : (      
            <> 
        <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.empresa ? cliente.empresa : cliente.nombre}</h1>
        <p className='mt-3'>Informacion del cliente</p>


        <p className='text-4xl text-gray-600 mt-10'>
            <span className='text-gray-800 uppercase font-bold '>Nombre: </span>
            {cliente.nombre}
        </p>

        <p className='text-2xl text-gray-600 mt-4'>
            <span className='text-gray-800 uppercase font-bold '>Email: </span>
            {cliente.email}
        </p>
        <p className='text-2xl text-gray-600 mt-4'>
            <span className='text-gray-800 uppercase font-bold '>Telefono: </span>
            {cliente.telefono}
        </p>
        {cliente.notas && (
            <p className='text-2xl text-gray-700 mt-4'>
            <span className='text-gray-800 uppercase font-bold '>Notas: </span>
            {cliente.notas}
        </p>

        )}
        </>
)}
        
    </div>)
  )
}

export default VerCliente