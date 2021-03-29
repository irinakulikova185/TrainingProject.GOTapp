import React, { Component } from 'react';
import ItemList from '../itemList/itemList'
import ItemDetails, {Field} from '../itemDetails/itemDetails'
import ErrorMessage from '../errorMessage/errorMessage'
import GotService from '../../services/gotService'
import RowBlock from '../rowBlock/rowBlock'

export default class HousePage extends Component {
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
            getData={this.gotService.getAllHouses}
            renderItem={item => item.name}/>
        )
        const itemDetails = (
            <ItemDetails itemType='house' itemId={this.state.selectedItemId} getData={this.gotService.getHouse}>
                <Field field='region' label='Region'></Field>
                <Field field='words' label='Words'></Field>
                <Field field='titles' label='Titles'></Field>
                <Field field='ancestralWeapons' label='Ancestral Weapons'></Field>
            </ItemDetails>
        )
        return (
            <RowBlock left={itemList} right={itemDetails}/>
        )
    }
}