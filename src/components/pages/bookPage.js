import React, { Component } from 'react';
import ItemList from '../itemList/itemList'
import ErrorMessage from '../errorMessage/errorMessage'
import GotService from '../../services/gotService'
import RowBlock from '../rowBlock/rowBlock'
import {withRouter} from 'react-router-dom'
import '../itemDetails/itemDetails.css'


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
        const itemList = (
            <ItemList onSelectItem={(itemId) => {
                this.props.history.push(`/books/${itemId}`)
            }}
            getData={this.gotService.getAllBooks}
            renderItem={item => item.name}/>
        )
        const selectItem = (
            <span className='select-item'>Please select a book</span>
        )
        return (
            <RowBlock left={itemList} right={selectItem}/>
            
        )
    }
}

export default withRouter(BookPage)