import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails/itemDetails'
import GotService from '../../services/gotService'
import {Link} from 'react-router-dom'

export default class BooksItem extends Component {
    constructor(props) {
        super(props)
       
        this.gotService = new GotService()
    }
    closeBooksItem() {

    }
    render() {
        return (
        <ItemDetails itemType='book' itemId={this.props.bookId} getData={this.gotService.getBook}>
            <Field field='numberOfPages' label='Number Of Pages'></Field>
            <Field field='publisher' label='Publisher'></Field>
            <Field field='released' label='Released'></Field>
            <span className='term'><Link to='/books'>Back</Link></span>
        </ItemDetails>
     
            )
    }
   
    
}

    