
import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import update from 'react-addons-update'
var UsaStates = require('usa-states').UsaStates;
const countries = require('country-list');;

export default class Popup extends Component {
  constructor () {
    super()
    this.state = {
     form: {
       product: '',
       qty: 1

     }
    }
  }
  change=(event) =>{
    var name =event.target.name
    var value =(event.target.type ==='checkbox') ? event.target.checked : event.target.value
    let currentState = this.state
    let newState =update(currentState,{
      form: {
        $merge:{
          [name]: value
        }
      }
    })
    this.setState(newState, () =>{
      console.log(this.state)
    })
  }
  showProducts = () => {
    if( this.props.allProducts != ''){
      return this.props.allProducts.map((item) =>(
        <option key={item.id} value={item.id}>{item.title}</option>))
    }
  }
  clickedSaveItemBtn = () =>{
    let product = this.props.allProducts.filter((product) => product.id ==this.state.form.product)
    // console.log('===========================')
    // console.log(test[0])
    // console.log('===========================')
    let itemData ={
      productInfo:product[0],
      qtyBuying:this.state.form.qty
    }
    this.props.addItemToList(itemData)
    this.props.closePopup()
  }

  clickedCancelBtn =() =>{
    this.props.closePopup()
  }

  render () {
    return (
      <div className= {`popup ${(this.props.showPopup) ? 'active': ''}`} >
        <div className="container-box">
          <div className="row">
            <div className="col-md-12">
              <h2>Add item to order</h2>
              <div className="form-group">
                <label htmlFor="">Product</label>
                <select className="custom-select" name="product" value={this.state.form.product} onChange={this.change}>
                <option value="none">Select a Sneaker </option>
                 {this.showProducts()}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="">Quantity</label>
                <select className="custom-select" name="qty" value={this.state.form.qty} onChange={this.change}>
                  <option value="1">
                    1
                  </option>
                  <option value="2">
                    2
                  </option>
                  <option value="3">
                    3
                  </option>
                  <option value="4">
                    4
                  </option>
                  <option value="5">
                    5
                  </option>
                  <option value="6">
                    6
                  </option>
                  <option value="7">
                    7
                  </option>
                  <option value="8">
                    8
                  </option>
                  <option value="9">
                    9
                  </option>
                  <option value="10">
                    10
                  </option>
                  <option value="11">
                    11
                  </option>
                </select>
              </div>
              <div className="add-btn btn btn-primary mb-3" onClick={this.clickedSaveItemBtn}>
                Save Item

              </div>
              <div className="add-btn btn btn-danger mb-3" onClick={this.clickedCancelBtn}>
                Cancel

              </div>

            </div>
          </div>
        </div>
      </div>)
  }
}
