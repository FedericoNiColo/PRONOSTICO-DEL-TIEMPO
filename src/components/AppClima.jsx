import Formulario from "./Formulario"
import Resultado from "./Resultado"
import useClima from '../hooks/useClima'
import Loading from "./Loading"


const AppClima = () => {

    const { resultadoClima, loading, noResultado } = useClima()

    return (
        <>
            <main className="dos-columnas">
                <Formulario />

                {loading ? <Loading /> :
                    resultadoClima?.name ? <Resultado /> :
                        noResultado ? <p>{noResultado}</p> :
                            null}
            </main>

        </>
    )
}

export default AppClima
