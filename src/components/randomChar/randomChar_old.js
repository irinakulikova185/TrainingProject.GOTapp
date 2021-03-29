import React, { Component } from 'react';
import GotService from '../../services/gotService'
import Spinner from '../spinner/spinner'
import './randomChar.css'
import Error from '../errorMessage/errorMessage'

export default class RandomChar extends Component{
    constructor() {
        super()
        this.state= {
            char: {},
            loading: true,
            error: false
        } 
        
        this.gotService = new GotService()
        this.onCharLoaded = this.onCharLoaded.bind(this)
        this.onError = this.onError.bind(this)
        this.updateChar = this.updateChar.bind(this)
       
        
    }
    componentDidMount(){
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    onCharLoaded(char) {
        this.setState({
            char: char,
            loading: false
         })
    }

    onError() {
        this.setState({
            error: true,
            loading: false
        })
    }

    updateChar() {
        const id = Math.floor(Math.random()*(140-25) + 25)

        this.gotService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }
    render() {
        const {char, loading, error} = this.state
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
    
}

RandomChar.defaultProps = {
    interval: 5000
}
const Content = (props) => {
    const {name, gender, born, died, culture} = props.char
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


