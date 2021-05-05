import React from 'react';
import './order.css';
import rightArrow from "../img/rightArrow.png"
import { Link } from 'react-router-dom'
// import { getActiveOrders } from '../api';
import axios from 'axios';
import _map from 'lodash/map'
import { useState, useEffect } from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="title">
                <br /><br />
                <h1>Current Orders</h1>
                <Link to={'/cart/order/past'}>
                    <button className="past" type="submit" value="past">View past orders</button>
                </Link>
                <br />
            </div>
        )
    }
}

interface OrderProps{}
interface OrderState {
    status: String; 
    items: any; 
    total: Number; 
    isChanged: Boolean; 
    vendorId: any; 
    placedTimestamp: Date;
  }

class ListActiveOrder extends React.Component {
    // [orders: IOrder, setOrders: IOrder] = useState<IOrder[]>([]);
    state = {
        error: null,
        isLoaded: false,
        orderList: [] as any[]
    }
 

    async getActiveOrders() {
        const BASE_URL = "http://localhost:48080/api";
        const endpoint = `${BASE_URL}/customer/orders/active`;
        return await axios.get(endpoint) 
        .then((response) => {
            var data = response.data
            this.setState({isLoaded: true, orderList: data});
            console.log(response);  
        }, (error) => {
            this.setState({isLoaded: true, error});
            console.log(error);
        },);
    }

    componentDidMount() {
        this.getActiveOrders();
    }

    render() {
        const { error, isLoaded, orderList } = this.state;
            return (
            <div className="content">
                { orderList.length ?

            orderList.map(order => (    
                    <button className="order" type="submit" value="order">
                        <img alt="right arrow" className="right" src={rightArrow} />
                        <h2>{order.vendorId}</h2>
                        <p id="ready">{order.status}</p>
                        <p className="date">{order.placedTimestamp}</p>
                    </button>
            ))
            :
            (<h2>No Order Present</h2>)
            }
            </div>
            );
    }

}

class OrderCurrent extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <ListActiveOrder />
            </div>
        )
    }
}

export default OrderCurrent;