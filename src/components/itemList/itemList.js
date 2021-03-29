import React, {useState, useEffect} from 'react';
import './itemList.css'
import Spinner from '../spinner/spinner';

function ItemList(props) {
    const {getData, renderItem, onSelectItem} = props

    const [itemList, updateList] = useState(null);

    useEffect(() => {
        getData()
        .then((data) => {
            updateList(data)
        })
    }, [])

    function renderItems(arr) {
        
        return arr.map((item) => {
            const label = renderItem(item)
            return (
                <li 
                    className="list-group-item"
                    key={item.id}
                    onClick={() => onSelectItem(item.id)}>{label}
                </li>
            )
        })
        
    }
    if(!itemList) {
        return <Spinner/>
    }
    const items = renderItems(itemList)
    return (
        <ul className="item-list list-group">
        {items}
        </ul>
    )
    
    
}

export default ItemList
