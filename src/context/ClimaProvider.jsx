import { useState, createContext } from "react";
import axios from 'axios'

const ClimaContext = createContext()

const ClimaProvider = ({ children }) => {


    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: ''
    })
    const [resultadoClima, setResultadoClima] = useState({})
    const [loading, setLoading] = useState(false)
    const [noResultado, setNoResultado] = useState(false)

    const datosBusqueda = e => {
        setBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const consultarClima = async datos => {
        setLoading(true)
        setNoResultado(false);
        setResultadoClima({});
        try {

            const { ciudad, pais } = datos

            const appId = '5ea9515e952f1d269f660ad45a24614f'

            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},
            ${pais}&limit=1&appid=${appId}`

            const { data } = await axios(url)
            const { lat, lon } = data[0]

            const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const { data: clima } = await axios(urlClima)

            setTimeout(() => {
                setResultadoClima(clima);
            }, 1500);

        } catch (error) {
            setNoResultado('No se encontraron resultados');

        } finally {
            setLoading(false)
        }
    }


    return (
        <ClimaContext.Provider
            value={{
                busqueda,
                datosBusqueda,
                consultarClima,
                resultadoClima,
                loading,
                noResultado
            }}
        >
            {children}
        </ClimaContext.Provider>
    )
}

export {
    ClimaProvider
}

export default ClimaContext