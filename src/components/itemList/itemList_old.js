import React, { Component } from 'react';
import './itemList.css'
import Spinner from '../spinner/spinner';

export default class ItemList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemList : null
        }
        
    }
    componentDidMount() {
        const {getData} = this.props
        getData()
        .then(res => {
            this.setState({
                itemList : res 
            })
        }) 
         
    }

    renderItems(arr) {
        

        return arr.map((item) => {
            const label = this.props.renderItem(item)
            return (
                <li 
                    className="list-group-item"
                    key={item.id}
                    onClick={() => this.props.onSelectItem(item.id)}>{label}
                </li>
            )
        })
        
    }
    

    render() {
        const {itemList} = this.state
        if(!itemList) {
            return <Spinner/>
        }
        const items = this.renderItems(itemList)
        return (
            <ul className="item-list list-group">
             {items}
            </ul>
        )
    }
    
}
