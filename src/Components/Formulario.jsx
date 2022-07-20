import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'
import { useNavigate } from 'react-router-dom'

const Formulario = ({cliente}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                            .min(3, "el nombre es muy corto")
                            .max(30, "el nombre es muy largo")
                            .required("Este campo es obligatorio"),
        empresa: Yup.string(),
        email: Yup.string().required("El mail es obligatorio").email("Coloca un mail valido"),
        telefono: Yup.number().required("Ingresa el telefono").min(10,"Ingresa el numero correctamente").typeError("Numero no valido").integer("Numero no valido").positive("Numero no valido"),

    })

    const handleSubmit = async (valores) =>{
            try {
                let respuesta
                if (cliente.id){
                    //edita el registro que ya esta
                    const url = `http://localhost:4000/clientes/${cliente.id}`
                    respuesta = await fetch(url,{
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                    
                } else{
                    //crea un nuevo registro
                const url = 'http://localhost:4000/clientes'
                 respuesta = await fetch(url,{
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
               
                }
                await respuesta.json()
                navigate('/clientes')
            } catch (error) {
                console.log("Error...." + error)
            }
    }
  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase'>{cliente?.nombre ? "Editar Cliente" : "Nuevo Cliente"}</h1>

        <Formik 
            initialValues={{
                nombre: cliente?.nombre ?? '',
                empresa: cliente?.empresa ?? '',
                email: cliente?.email ?? '',
                telefono: cliente?.telefono ?? '',
                notas:cliente?.notas ?? ''


            }}
            enableReinitialize = {true}
            onSubmit={async(values,{resetForm})=>{
                await handleSubmit(values)
                resetForm()
            }}
            validationSchema={nuevoClienteSchema}
        
        >
            {({errors, touched})=>{
                {/* console.log(data) */}
                return(

            <Form
            className="mt-10"
            >
            <div className='mb-4'>
                <label className='text-gray-800' htmlFor='nombre'>Nombre: </label>
                <Field
                    id="nombre"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del cliente"
                    name = "nombre"
                    
                 />
                 {errors.nombre && touched.nombre ? (
                    <Alerta>{errors.nombre}</Alerta>
                 ):null}

            </div>

            <div className='mb-4'>
                <label className='text-gray-800' htmlFor='empresa'>Empresa: </label>
                <Field
                    id="empresa"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre Empresa"
                    name = "empresa"

                 />
                 {errors.empresa && touched.empresa ? (
                    <Alerta>{errors.empresa}</Alerta>
                 ):null}

            </div>

            <div className='mb-4'>
                <label className='text-gray-800' htmlFor='email'>Email: </label>
                <Field
                    id="email"
                    type="email"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Email"
                    name = "email"

                 />
                 {errors.email && touched.email ? (
                    <Alerta>{errors.email}</Alerta>
                 ):null}

            </div>

            <div className='mb-4'>
                <label className='text-gray-800' htmlFor='telefono'>Telefono: </label>
                <Field
                    id="telefono"
                    type="tel"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Telefono (ejemplo 1151486202)"
                    name = "telefono"

                 />
                 {errors.telefono && touched.telefono ? (
                    <Alerta>{errors.telefono}</Alerta>
                 ):null}

            </div>

            <div className='mb-4'>
                <label className='text-gray-800' htmlFor='notas'>Notas: </label>
                <Field
                    as ="textarea"
                    id="notas"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Notas"
                    name = "notas"

                 />

            </div>

            <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Nuevo Cliente"}
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'

            />

            </Form>
            )}}
        </Formik>

         
    </div>
  )
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario