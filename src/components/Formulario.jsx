import React from 'react'
import { useState } from 'react'
import useClima from '../hooks/useClima'

const Formulario = () => {

    const { busqueda, datosBusqueda, consultarClima } = useClima()
    const { ciudad, pais } = busqueda
    const [alerta, setAlerta] = useState('')


    const handleSubmit = e => {
        e.preventDefault()

        if (Object.values(busqueda).includes('')) {
            setAlerta('Todos los campos son obligatorios')
            return
        }

        consultarClima(busqueda)

    }



    return (
        <div className='contenedor'>
            <form onSubmit={handleSubmit}>
                {alerta && <p>{alerta}</p>}
                <div className='campo'>
                    <label htmlFor="ciudad">Ciudad</label>
                    <input
                        type="text"
                        id='ciudad'
                        name='ciudad'
                        value={ciudad}
                        onChange={datosBusqueda}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="pais">País</label>
                    <select
                        name="pais"
                        id="pais"
                        value={pais}
                        onChange={datosBusqueda}
                    >
                        <option value="">--Seleccione País--</option>
                        <option value="US">Estados Unidos</option>
                        <option value="CO">Colombia</option>
                        <option value="MX">México</option>
                        <option value="AR">Argenitna</option>
                        <option value="CO">Costa Rica</option>
                        <option value="PE">Seleccione País</option>
                        <option value="ES">España</option>
                    </select>
                </div>

                <input type="submit" value='consultar clima' />
            </form>
        </div>
    )
}

export default Formulario
