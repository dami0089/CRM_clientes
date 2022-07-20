import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {
    const navigate = useNavigate()

  return (
    <tr className='border-b hover:bg-gray-50'>
        <td className='p-3'>{cliente.nombre}</td>  
        <td className='p-3'>
            <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{cliente.email}</p>
            <p><span className='text-gray-800 uppercase font-bold'>Telefono: </span>{cliente.telefono}</p>
        </td>  
        <td className='p-3'>{cliente.empresa}</td>  
        <td className='p-3'>

        <button className='bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs mt-3 '
                type='button'
                onClick={()=>navigate(`/clientes/${cliente.id}`)}
                >Ver</button>
            <button className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3'
                type='button'
                onClick={()=>navigate(`/clientes/editar/${cliente.id}`)}
                >Editar</button>
            <button className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3 '
                type='button'
                onClick={()=> handleEliminar(cliente.id)}
                >Eliminar</button>    
        </td>  

    </tr>
  )
}

export default Cliente