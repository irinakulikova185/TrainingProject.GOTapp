import React, { Component } from 'react';
import ItemList from '../itemList/itemList'
import ErrorMessage from '../errorMessage/errorMessage'
import GotService from '../../services/gotService'
import {withRouter} from 'react-router-dom'


class BookPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false
        }
        this.gotService = new GotService()
        
    }
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }


    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        // if(this.state.loading) {
        //     return <Spinner/>
        // }
      
        return (
            <ItemList onSelectItem={(itemId) => {
                this.props.history.push(`/books/${itemId}`)
            }}
            getData={this.gotService.getAllBooks}
            renderItem={item => item.name}/>
        )
    }
}

export default withRouter(BookPage)