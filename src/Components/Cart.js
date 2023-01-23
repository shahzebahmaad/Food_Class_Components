import React, { Component } from 'react'
import Menu from './Menu.json'


export default class Cart extends Component {
    

    constructor() {
        
        // const id = window.location.pathname.split("/cart/");
        const id = window.location.pathname.split(/[/,cart]/);
        console.log(id,"=ID")
        super();
        this.state = {
            i: 1,
            cartArr: [Menu.find(obj => {
                return (
                    /* eslint-disable-next-line */
                    obj.id == id[6]
                )
            })],
            count: 1,
            qty: 0,
            subTotal: id[7]
        }
        // console.log("ID=", id);

    }
    increment = () => {
        if (this.state.count >= 1 && this.state.count < 5) {



            this.setState({ count: ++this.state.count })

            {
                this.state.cartArr.map((result) => {
                    return (

                    this.setState({ subTotal: result.price * this.state.count }))


                })
            }



            // console.log(location.state.id[0].price * count);
        }
    }
    decrement = () => {
        if (this.state.count > 1 && this.state.count <= 5) {



            this.setState({ count: --this.state.count })

            {
                this.state.cartArr.map((result) => {
                    return (

                    this.setState({ subTotal: result.price * this.state.count }))


                })
            }



            // console.log(location.state.id[0].price * count);
        }
    }
    buyNow (result) {
        console.log(result.id)
        window.location = `http://localhost:3000/invoice/${result.id}/${this.state.count}/${this.state.subTotal}`;

    }
    render() {
        return (

            <div>
                <h1 className='home-div'>CART</h1>
                <div>
                    <table>
                        <tr>
                            
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                            <th>Buy Now</th>
                        </tr>
                        {
                            this.state.cartArr.map((result, index) => {
                                return (
                                    <tr key={index}>
                                        {/* eslint-disable-next-line */}
                                        {/* <td>{this.state.i++}</td> */}
                                        <td><img src={result.image} alt="" className='img' /></td>
                                        <td>{result.name}</td>
                                        <td>{result.price}/Rs</td>
                                        <td>{result.type}</td>
                                        <td><button className='count-btn' onClick={this.decrement} disabled={this.state.count === 1}>-</button>
                                            <span>{this.state.count}</span>
                                            <button className='count-btn' onClick={this.increment} disabled={this.state.count === 5}>+</button></td>
                                        <td>{this.state.subTotal}</td>
                                        <td><button className='Cart' onClick={()=>this.buyNow(result)} >Buy Now</button></td>
                                    </tr>
                                );
                            })
                        }


                    </table>
                </div>
            </div>
        )
    }
}
