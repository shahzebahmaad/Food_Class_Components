import React, { Component } from 'react'
import Menu from './Menu.json'
import axios from 'axios';


export default class Invoice extends Component {
    constructor() {
        const id = window.location.pathname.split(/[/,invoice]/);
        super();
        this.state = {
            data: Menu,
            invoice: [Menu.find((obj) => {
                return (
                    obj.id == id[9]
                )
            })],
            qty: id[10],
            subTotal: id[11],
            formValue: {
                fname: "",
                lname: "",
                email: "",
                phone: "",
                country:'',
                state:'',
                city:''
            },
            country: [],
            countryValue: '',
            stat: [],
            stateValue:'',
            city:[],
            cityValue:''
        }
        // console.log("id",id)
        // console.log("ID", id[9])
        // console.log("Subtotal", id[10])
        // console.log("Qty", id[11])
        // console.log("INVOICE1",this.state.invoice)
      
    }
    componentDidMount() {
        axios.get("https://countriesnow.space/api/v0.1/countries")
            .then((res) => {
                this.setState({ country: res.data.data })

            }
            )

    }
    componentDidUpdate(prevState){
    if(prevState.countryValue !== this.state.countryValue) {
        axios.post("https://countriesnow.space/api/v0.1/countries/states", {
            "country": this.state.countryValue
        })
            .then((res) => {
                this.setState({ stat: res.data.data.states })

            }
            )
    }
    if(prevState.countryValue !== this.state.countryValue || prevState.stateValue !== this.state.stateValue )
    axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        "country": this.state.countryValue,
        "state": this.state.stateValue
    })
        .then((res) => {
            this.setState({ city: res.data.data })

        }
        )}
        componentWillUnmount() {
            axios.get("https://countriesnow.space/api/v0.1/countries")
        }
    handleCountry = (event) => {
        this.setState({ countryValue: event.target.value })
        const { name, value } = event.target;
        this.setState({ formValue: { ...this.state.formValue, [name]: value } });
    }
    handleState = (event) => {
        this.setState({ stateValue: event.target.value })
        const { name, value } = event.target;
        this.setState({ formValue: { ...this.state.formValue, [name]: value } });
    }
    handleCity = (event) => {
        this.setState({ cityValue: event.target.value })
        const { name, value } = event.target;
        this.setState({ formValue: { ...this.state.formValue, [name]: value } });
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ formValue: { ...this.state.formValue, [name]: value } });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.formValue);
        // window.location = `http://localhost:3000/thanks`;
    }
    render() {
        return (

            <div>
                <h1 className='home-div'>INVOICE</h1>
                <table>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                    </tr>
                    {
                        this.state.invoice.map((res, index) => {
                            return (
                                <tr key={index}>
                                    <td><img src={res.image} alt="" className='img' /></td>
                                    <td>{res.name}</td>
                                    <td>{res.price}</td>
                                    <td>{res.type}</td>
                                    <td>{this.state.qty}</td>
                                    <td>{this.state.subTotal}</td>
                                </tr>
                            )
                        })
                    }
                </table>
                <form onSubmit={this.handleSubmit} >
                    <label >First Name</label>
                    <input
                        type="text"
                        autoComplete='off'
                        placeholder='Enter First Name'
                        name='fname'
                        value={this.state.formValue.fname}
                        onChange={this.handleChange}
                    />
                    <label >Last Name</label>
                    <input type="text"
                        autoComplete='off'
                        placeholder='Enter Last Name'
                        name='lname'
                        value={this.state.formValue.lname}
                        onChange={this.handleChange}
                    />
                    <label >Phone Number</label>
                    <input type="text"
                        autoComplete='off'
                        placeholder='Enter Phone Number'
                        name='phone'
                        value={this.state.formValue.phone}
                        onChange={this.handleChange}
                    />
                    <label >Email Address</label>
                    <input type="text"
                        autoComplete='off'
                        placeholder='Enter Email Address'
                        name='email'
                        value={this.state.formValue.email}
                        onChange={this.handleChange}
                    /><label>Select Country</label>
                    <select onChange={this.handleCountry} value={this.state.formValue.country} name='country'>
                        <option>Select Country</option>
                        {
                            this.state.country.map((con, id) => {
                                return (
                                    <option
                                        key={id}>{con.country}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label>Select State</label>
                    <select onChange={this.handleState} value={this.state.formValue.state} name='state'>
                        <option>Select State</option>
                        {
                            this.state.stat.map((st, id) => {
                                return (
                                    <option
                                        key={id} >{st.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label>Select City</label>
                <select onChange={this.handleCity} value={this.state.formValue.city} name='city' >
                    <option>Select City</option>
                    {
                        this.state.city.map((cities, id) => {
                            return (
                                <option
                                    key={id} >{cities}
                                </option>
                            )
                        })
                    }
                </select>
                    <input type='submit' />
                </form>

            </div>
        )
    }
}
