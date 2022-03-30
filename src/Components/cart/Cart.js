import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { decrementQuantity, incrementQuantity, rmvItem } from "./CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    let amount = 0;
    const amountArr = cartItems.map((item) => item.price * item.quantity);
    for (let i = 0; i < amountArr.length; i++) {
      amount += amountArr[i];
    }
    setTotalAmount(amount);
  }, [cartItems]);

  const decrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  const increment = (item) => {
    dispatch(incrementQuantity(item));
  };

  const removeItem = (item) => {
    dispatch(rmvItem(item));
  };

  const cartEl = cartItems?.map((item, index) => {
    return (
      <div key={index} className="panel-body">
        {/* <form> */}
        <div className="row">
          <div className="col-md-3">
            {" "}
            <img
              src={`http://interviewapi.ngminds.com/${item.image}`}
              width="100px"
              height="200px"
            />
          </div>
          <div className="col-md-3">
            {" "}
            {item.name}
            <br />
            <i className="fa fa-inr"></i>
            {item.price}
          </div>
          <div className="col-md-3">
            {" "}
            quantity
            <br />
            <button
              onClick={() => decrement(item)}
              className="qtyminus"
              ng-disabled="qty<=0"
              disabled={item.quantity === 1}
            >
              -
            </button>
            <input
              ng-model="qty"
              type="text"
              name="quantity"
              className="qty"
              size="5px"
              value={item.quantity}
              readOnly={true}
              style={{ width: 'inherit' }}
            />
            <button onClick={() => increment(item)}>+</button>
          </div>
          <div className="col-md-3">
            {" "}
            <div className="btn btn-warning" onClick={() => removeItem(item)}>
              remove
            </div>
          </div>
        </div>
        {/* </form> */}
        {/* <hr /> */}
        <div className="row">
          <div className="col-md-9">
            <label className="pull-right">Amount Payable</label>
          </div>
          <div className="col-md-3 ">{item.price * item.quantity}</div>
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <h1>
          <Link to="/">My Ecommerce Site</Link>

          <span className="pull-right">
            <Link to={"/Cart"}>Cart ({cartItems.length})</Link>
          </span>
        </h1>
        <hr />

        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">MY CART ({cartItems.length})</div>
            {cartItems.length > 0 ?
              <>
                {cartEl}
                <div className="row">
                  <div className="col-md-9">
                    <label className="pull-right">Total Amount Payable</label>
                  </div>
                  <div className="col-md-3 ">{totalAmount}</div>
                </div>
              </> :
              <div className="row">
                <h4 style={{ textAlign: 'center' }}>Your cart is empty </h4>
              </div>
            }
            <div className="panel-footer">
              <Link to={"/Home"} className="btn btn-success">
                Continue Shopping
              </Link>
              <Link
                to={`${totalAmount >= 500 ? "/place-order" : ""}`}
                className="pull-right btn btn-danger"
                onClick={() =>
                  totalAmount < 500 &&
                  toast.error("Amount payable should be at least 500 !", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                }
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
