import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Cart() {

  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') === null ? [] : JSON.parse(localStorage.getItem('cartItems')));
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // console.log("Hello")
    let amount = 0;
    const amountArr = cartItems.map(item => item.price * item.quantity);
    for (let i = 0; i < amountArr.length; i++) {
      amount += amountArr[i];
    }
    setTotalAmount(amount);

  }, [cartItems])

  const decrement = (item) => {
    setCartItems(prev =>
      prev.map(product => product._id !== item._id ? product : { ...product, quantity: product.quantity - 1 })
    )
  }

  const increment = (item) => {
    setCartItems(prev =>
      prev.map(product => product._id !== item._id ? product : { ...product, quantity: product.quantity + 1 })
    )
  }

  const removeItem = (item) => {
    setCartItems(prev =>
      prev.filter(product => product._id !== item._id)
    )
  }

  const cartEl = cartItems?.map((item, index) => {
    return (
      <div key={index} className="panel-body">
        {/* <form> */}
        <div className="row">
          <div className="col-md-3"> <img src={`http://interviewapi.ngminds.com/${item.image}`} width="100px" height="200px" /></div>
          <div className="col-md-3"> {item.name}
            <br /><i className="fa fa-inr"></i>{item.price}
          </div>
          <div className="col-md-3"> quantity
            <br />
            <button onClick={() => decrement(item)} className='qtyminus' ng-disabled="qty<=0" disabled={item.quantity === 0}>-</button>
            <input ng-model="qty" type='text' name='quantity' className='qty' size="5px"
              value={item.quantity} readOnly={true} />
            <button onClick={() => increment(item)}>+</button>
          </div>
          <div className="col-md-3"> <div className="btn btn-warning" onClick={() => removeItem(item)}>remove</div></div>
        </div>
        {/* </form> */}
        {/* <hr /> */}
        <div className="row">
          <div className="col-md-9">
            <label className="pull-right">Amount Payable
            </label>
          </div>
          <div className="col-md-3 ">
            {item.price * item.quantity}
          </div>
        </div>
        <hr />
      </div>
    )
  })

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
            <div className="panel-heading">MY CART ({cartItems.length})
            </div>

            {cartEl}
            <div className="row">
              <div className="col-md-9">
                <label className="pull-right">Total Amount Payable
                </label>
              </div>
              <div className="col-md-3 ">
                {totalAmount}
              </div>
            </div>
            <div className="panel-footer">
              <Link to={'/Home'} className="btn btn-success">Continue Shopping</Link>
              <Link to={`${totalAmount >= 500 ? '/place-order' : ''}`} className="pull-right btn btn-danger" onClick={() => totalAmount < 500 && alert('Amount should be at least 500')}>Place Order</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
