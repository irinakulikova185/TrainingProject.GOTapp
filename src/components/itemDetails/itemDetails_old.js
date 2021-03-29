import React, { Component } from 'react';
import GotService from '../../services/gotService'
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

export default class ItemDetails extends Component{
    constructor(props) {
        super(props)

        this.state = {
            item: null,
            loading: true,
            error: false
        }
        this.gotService = new GotService()
        this.onItemDetailsLoaded = this.onItemDetailsLoaded.bind(this)
        this.onError = this.onError.bind(this)
    }
    componentDidMount() {
        this.updateItem()
    }
    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
        
    }

    onItemDetailsLoaded(item) {
        this.setState({
            item: item,
            loading: false,
            error: false
        })
    }

    onError() {
        this.setState({
            error: true
        })
    }

    updateItem() {
        const id = this.props.itemId
        if(!id) {
            return
        }
        this.setState({
            loading: true
        })
        const {getData} = this.props
        getData(id)
        .then(item => this.onItemDetailsLoaded(item) )
        .catch(this.onError)
    }
    render() {
        const {item, loading, error} = this.state
        
        if(!item && !error) {
            return <span className="select-item">Please select a {this.props.itemType}</span>
        } else if(error) {
            return (
                <div className="itemdetails-block">
                    <ErrorMessage/>
                </div>
            ) 
        }
        const {name} = item
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
                      React.Children.map(this.props.children, (child) => {
                          return React.cloneElement(child, {item})
                      })
                    }
        
                </ul>
    
            </div>
        )
    }
    
}
