import React, { Component } from 'react'
import Menu from './Menu.json'


// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            unique: [...new Set(Menu.map(obj => obj.type))],
            val: Menu,
            i: 1,
            inputfield: '',
            filterresult: '',
            data: {},
            textfield: true
        }
    }
    selectedtype = (event) => {
        const type = event.target.value;
        const newarr = Menu.filter(ele => {
            return (
                ele.type === type
            )
        });
        console.log(newarr)
        this.setState({ val: newarr })
        this.setState({ i: 1 });
        this.setState({textfield:false})
    }
    handlesearch = () => {
        console.log(this.state.filter);
        if(this.state.inputfield === ''){
            return (
                null
            )
        }
        else {
            const filterresult = this.state.val.filter((item) => item.name.toLowerCase()
            .includes(this.state.inputfield.toLowerCase()))
        this.setState({ val: filterresult })
        this.setState({ i: 1 });


        }

    }
    cart (response) {
        console.log(response.id);
        window.location = `http://localhost:3000/cart/${response.id}/${response.price}`;
       //  history.push(`/cart/${response.id}`);
        }
    render() {
        return (
            <div>
                <h1>Food Bhalu Class Components</h1>
                <select onChange={this.selectedtype} >
                    <option>---Select Food Type---</option>
                    {
                        this.state.unique.map((result, index) => {
                            return (
                                <option key={index} >{result}</option>
                            )
                        })
                    }
                </select><br />
                <input type="text"
                 placeholder='Search'
                  onChange={(e)=>this.setState({inputfield: e.target.value})}
                  disabled={this.state.textfield}
                  /><br />
                <button className='search-btn'
                 onClick={this.handlesearch}
                 disabled={this.state.textfield}
                 >Search</button>
                <table>
                    <tr>
                        <th>Sr no.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Type</th>
                    </tr>
                    {
                        this.state.val.map((response, index) => {
                            return (
                                <tr key={index}>
                                    {/* eslint-disable-next-line */}
                                    <td>{this.state.i++}</td>
                                    <td><img src={response.image} alt="" className='img' /></td>
                                    <td>{response.name}</td>
                                    <td>{response.price}/Rs</td>
                                    <td>{response.type}</td>
                                    <td><button className='Cart' onClick={()=>this.cart(response)} >ADD TO CART</button></td>
                                </tr>
                            );
                        })
                    }
                </table>
            </div>
        )
    }
}
