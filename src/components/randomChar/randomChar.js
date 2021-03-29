import React, { useState, useEffect} from 'react';
import GotService from '../../services/gotService'
import Spinner from '../spinner/spinner'
import './randomChar.css'
import Error from '../errorMessage/errorMessage'

function RandomChar(props) {
    // const {interval} = props

    const gotService = new GotService()
    const [char, setChar] = useState({})
    const [loading, toggleLoading] = useState(true)
    const [error, toggleError] = useState(false)

    useEffect(() => {
        updateChar()
        const timerId = setInterval(() => {
            updateChar()
            
        }, 3000)
        
        return function clear() {
                    clearInterval(timerId)
                }
    }, [] )



    function onCharLoaded(char) {
        setChar(char)
        toggleLoading(false)
    }

    function onError() {
        toggleError(true)
        toggleLoading(false)
    }

    function updateChar() {
        const id = Math.floor(Math.random()*(140-25) + 25)
        // const id = 13330
        gotService.getCharacter(id)
        .then((char) => onCharLoaded(char))
        .catch(() => onError())
    }
    
        
        const err = error ? <Error/> : null
        const spinner = loading ? <Spinner/> : null 
        const content = !(loading || error) ? <Content char={char}/> : null
        return(
            
            <div className="random-block">
                {err}
                {spinner}
                {content}
            </div>
        )
    
    
}
// RandomChar.defaultProps = {
//     interval: 5000
// }

export default RandomChar


const Content = (props) => {
    const {char} = props
    const {name, gender, born, died, culture} = char
    return (
        <>
            <h2>Random Character: {name}</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
        </>
    )
}


