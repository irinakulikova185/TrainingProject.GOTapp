import React, { Component } from 'react';
import ItemList from '../itemList/itemList'
import ItemDetails, {Field} from '../itemDetails/itemDetails'
import ErrorMessage from '../errorMessage/errorMessage'
import GotService from '../../services/gotService'
import RowBlock from '../rowBlock/rowBlock'



export default class CharacterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItemId: null,
            error: false
        }
        this.gotService = new GotService()
        this.onSelectItem = this.onSelectItem.bind(this)
    }
    
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onSelectItem(id) {
        this.setState({
            selectedItemId: id
        })
    }
    render() {
        if(this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList onSelectItem={this.onSelectItem}
            getData={this.gotService.getAllCharacters}
            renderItem={item => `${item.name} (${item.gender})`}/>
        )
        const itemDetails = (
            <ItemDetails itemType='character' itemId={this.state.selectedItemId} getData={this.gotService.getCharacter}>
                <Field field='gender' label='Gender'></Field>
                <Field field='born' label='Born'></Field>
                <Field field='died' label='Died'></Field>
                <Field field='culture' label='Culture'></Field>
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}