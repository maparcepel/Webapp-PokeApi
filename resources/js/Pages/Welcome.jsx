import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Welcome() {
    const [ history, setHistory ] = useState([])
    const [ pokemon, setPokemon ] = useState()
    const { register, handleSubmit, reset, setValue, formState: { errors} } = useForm()

    useEffect(() => {
        
        const getHistory = async () => {
            try {
                const response = await axios.get('/api/history')
                setHistory(response.data)
            } catch (error) {
                console.error('Error al intentar obtener el historial:', error)
            }
        }
        getHistory()
    }, []);

    const onSubmit = async(data) => {
        try {
            const response = await axios.post('/api/search', data)
            setHistory(response.data.history)
            setPokemon(response.data)
            reset()
        } catch (error) {
            setPokemon('not found')
            console.error('Error al intentar obtener el pokemon:', error)
        }
      }

      const handleReUse = (term) => {
            setValue('term', term)
      }

    return (
        <div className='container'>
                    <header className='text-center mt-5'>
                        <h1>Webapp PokeApi</h1>
                    </header>

                    <main className='text-center mt-5 d-flex justify-content-center'>
                        <div className='row'>
                            <div className='col'>
                                <form onSubmit={ handleSubmit(onSubmit)}>
                                    <div className='form-group d-flex justify-content-center'>
                                        <div className='form-group d-flex flex-column align-items-start'>
                                            <label htmlFor='term'></label>
                                            <input
                                                {...register('term', { required: true, maxLength: 50 })}
                                                type='text'
                                                className='form-control'
                                                id="term"
                                                style={{ width: '250px' }}
                                                />
                                            {pokemon === 'not found' && <span>Pokemon no encontrado</span>}
                                            {errors.term && <span>Este campo es requerido</span>}
                                        </div>
                                        <div className='ms-3'>   
                                            <button 
                                                type='submit'
                                                className='btn btn-primary'
                                            >
                                                Buscar
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                {
                                    pokemon !== undefined && pokemon !== 'not found' && pokemon.length !== 0 &&
                                    <div className='d-flex flex-column align-items-start mt-5'>
                                        <h3>{ pokemon.name.toUpperCase() }</h3>
                                        <h5>Habilidades</h5>
                                        <ul>
                                            {
                                                pokemon.abilities.map((ability, index) => (
                                                    <li key={index} >{ ability }</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                }
                            </div>
                            <div className='col ms-5 mb-5' id='history'>
                                <h3>Historial</h3>
                                {
                                    history && history.length !== 0 &&
                                    <ul>
                                        {history.map((item, index) => (
                                            <li 
                                                key={ index }
                                                onClick={ () => handleReUse(item.term) }
                                                style={{ cursor: 'pointer' }}
                                            >{item.term}</li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>
                        
                    </main>

                    <footer className='text-center mt-5'>
                        <p>
                            Desarrollo: marcelmolina.dev@gmail.com
                        </p>
                    </footer>
        </div>
    );
}
