import React, { useEffect, useState } from 'react';
import Spinner from '../spinner/spinner'
import ErrorMessage from '../errorMessage/errorMessage'
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
                        <span className="term">{label}</span>
                        <span>{item[field]}</span>
                    </li>
    )
}

export {Field}

function ItemDetails(props) {

    const {itemId, getData, itemType} = props

    const [item, setItem] = useState(null)
    const [loading, toggleLoading] = useState(true)
    const [error, toggleError] = useState(false)
      
 

    useEffect(() => updateItem(), [itemId])
   
    function onItemDetailsLoaded(item) {
        setItem(item)
        toggleLoading(false)
        toggleError(false)
    }

    function onError() {
        toggleError(true)
    }

    function updateItem() {
        const id = itemId
        if(!id) {
            return
        }
        toggleLoading(true)
       
        getData(id)
        .then(item => onItemDetailsLoaded(item) )
        .catch(() => onError())
    }
    
        
        
        if(!item && !error) {
            return <span className="select-item">Please select a {itemType}</span>
        } else if(error) {
            return (
                <div className="itemdetails-block">
                    <ErrorMessage/>
                </div>
            ) 
        }
        const {name} = item
        console.log(loading)
        if(loading) {
            return (
                <div className="itemdetails-block">
                    <Spinner/>
                </div>
            ) 
        }
        return (
            <div className="itemdetails-block">
                <h2>{name}</h2>
                <ul className="list-group list-group-flush">

                    {
                      React.Children.map(props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                    }
        
                </ul>
    
            </div>
        )
    
    
}

export default ItemDetails

