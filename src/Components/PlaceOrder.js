import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceOrder() {

  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') === null ? [] : JSON.parse(localStorage.getItem('cartItems')));

  const quantityArr = cartItems.map(item => item.quantity);
  const amountArr = cartItems.map(item => item.quantity * item.price);
  let totalQuantity = 0;
  let totalAmount = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalQuantity += quantityArr[i];
    totalAmount += amountArr[i];
  }

  const [info, setInfo] = useState({
    name: '',
    address: ''
  })

  const confirmOrder = () => {
    // console.log(info);
    let payload = {
      "personName": info.name,
      "deliveryAddress": info.address,
      "productsOrdered": cartItems.map(item => {
        return {
          "productID": item._id,
          "qty": item.quantity,
          "price": item.price,
          "total": item.price * item.quantity
        }
      }),
      "orderTotal": totalAmount
    }
    console.log(payload);
    axios.post(`http://interviewapi.ngminds.com/api/placeOrder`,payload)
    .then(res => console.log(res));
  }

  return (
    <div className="container">
      <div className="row">
        <h1>
          <Link to="/">My Ecommerce Site</Link>

          <span className="pull-right">
            <Link to={'/Cart'}>Cart ({cartItems.length})</Link>
          </span>
        </h1>
        <hr />
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">Place Order</div>
            <div className="panel-body">
              <form className="form-horizontal" role="form">

                <table className="table table-striped">
                  <thead className="table-head">
                    <tr>
                      <td>Product Name</td>
                      <td> Quntity</td>
                      <td> SubTotal</td>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name} </td>
                          <td>{item.quantity}</td>
                          <td><i className="fa fa-inr"></i>{item.quantity * item.price}</td>
                        </tr>
                      )
                    })}
                    {/* <tr>
                      <td>H2O Sb104 Stainless Steel Sports </td>
                      <td>2</td>
                      <td><i className="fa fa-inr"></i>400</td>
                    </tr>
                    <tr>
                      <td>bbb</td>
                      <td>1</td>
                      <td><i className="fa fa-inr"></i>1000</td>
                    </tr> */}
                    <tr>
                      <td><strong>Total</strong></td>
                      <td>
                        <strong> {totalQuantity}</strong>
                      </td>
                      <td><strong><i className="fa fa-inr"></i>{totalAmount} </strong></td>
                    </tr>
                  </tbody>
                </table>
                <br />

                <br />
                <div className="form-group">
                  <label htmlFor="inputName3" className="col-sm-2 control-label">Enter Order Details</label>
                </div>
                <div className="form-group">
                  <label htmlFor="inputName3" className="col-sm-2 control-label">Name</label>
                  <div className="col-sm-6">
                    <input className="form-control" id="inputName3" placeholder="Name" onChange={(e) => setInfo({ ...info, name: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputEmail3" className="col-sm-2 control-label">Address</label>
                  <div className="col-sm-6">
                    <textarea className="form-control" id="inputEmail3"
                      placeholder="Deliver Address" onChange={(e) => setInfo({ ...info, address: e.target.value })}></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label"></label>
                  <div className="col-sm-6">
                    <div onClick={() => confirmOrder()} className="btn btn-warning">Confirm Order</div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
