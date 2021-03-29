import React, { Component } from 'react';
import {Col, Row, Container, ButtonToggle} from 'reactstrap';
import Header from '../header/header'
import RandomChar from '../randomChar/randomChar'
import ErrorMessage from '../errorMessage/errorMessage'
import CharacterPage from '../pages/characterPage'
import BookPage from '../pages/bookPage'
import HousePage from '../pages/housePage'
import GotService from '../../services/gotService'
import BooksItem from '../pages/booksItem'
import {BrowserRouter as Router, Route} from "react-router-dom";
import './app.css'


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showRandomChar: true,
            error: false,
            
        }
        this.gotService = new GotService()
        this.onToggleRandomChar = this.onToggleRandomChar.bind(this)
        
    }
    onToggleRandomChar() {
        this.setState(state => ({
            showRandomChar: !state.showRandomChar
        }))
    }
    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })

    }

 
    render() {
        const {showRandomChar, error} = this.state
        if(error) {
            return <ErrorMessage/>
        }
        const randomChar = showRandomChar ? <RandomChar/> : null
        return (
           
            <Router>
                <div className='app'>
                    <Container>
                        <Header/>
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomChar}
                            </Col>   
                        </Row>
                        <Row>
                            <ButtonToggle 
                                className='button' 
                                color="primary" 
                                size="lg"
                                onClick={this.onToggleRandomChar}>Toggle random Character</ButtonToggle> 
                        </Row>
                        <Route path='/characters' component={CharacterPage}/> 
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render = {
                            ({match}) => {
                                const {id} = match.params
                                return <BooksItem bookId={id}/>  }
                        } />  
                    </Container>
                </div>
           </Router>
        )
    }
    
}

