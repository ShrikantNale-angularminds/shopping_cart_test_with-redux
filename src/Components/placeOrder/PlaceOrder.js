import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, setResult } from "./PlaceOrderSlice";

function PlaceOrder() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const { result } = useSelector(state => state.placeOrder);

  if (result.status) {
    if (result.status === 'success') {
      toast.success(`${result.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      dispatch(setResult({}))
    }
    else {
      toast.error(`${result.message} !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      dispatch(setResult({}))
    }
  }

  const quantityArr = cartItems.map((item) => item.quantity);
  const amountArr = cartItems.map((item) => item.quantity * item.price);

  let totalQuantity = 0;
  let totalAmount = 0;

  for (let i = 0; i < cartItems.length; i++) {
    totalQuantity += quantityArr[i];
    totalAmount += amountArr[i];
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    let payload = {
      personName: data.name,
      deliveryAddress: data.address,
      productsOrdered: cartItems.map((item) => {
        return {
          productID: item._id,
          qty: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        };
      }),
      orderTotal: totalAmount,
    };
    console.log(payload);

    dispatch(placeOrder(payload));
    reset({
      name: '',
      address: ''
    })
    dispatch(setResult({}))
  }


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
            <div className="panel-heading">Place Order</div>
            <div className="panel-body">
              <form className="form-horizontal" role="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <table className="table table-striped">
                  <thead className="table-head">
                    <tr>
                      <td>Product Name</td>
                      <td> Quntity</td>
                      <td> SubTotal</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartItems.map((item, index) => {
                        if (item.quantity > 0) {
                          return (
                            <tr key={index}>
                              <td>{item.name} </td>
                              <td>{item.quantity}</td>
                              <td>
                                <i className="fa fa-inr"></i>
                                {item.quantity * item.price}
                              </td>
                            </tr>
                          )
                        } else {
                          return
                        }
                      })
                    }
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>
                        <strong> {totalQuantity}</strong>
                      </td>
                      <td>
                        <strong>
                          <i className="fa fa-inr"></i>
                          {totalAmount}{" "}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />

                <br />
                <div className="form-group">
                  <label
                    htmlFor="inputName3"
                    className="col-sm-2 control-label"
                  >
                    Enter Order Details
                  </label>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputName3"
                    className="col-sm-2 control-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-6">
                    <input
                      className="form-control"
                      id="inputName3"
                      placeholder="Name"
                      /* onChange={(e) =>
                        setInfo({ ...info, name: e.target.value })
                      } */
                      {...register('name', { required: true })}
                    />
                    {errors.name && <p style={{ color: 'red', paddingTop: '5px' }}>This field is required.</p>}
                  </div>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 control-label"
                  >
                    Address
                  </label>
                  <div className="col-sm-6">
                    <textarea
                      className="form-control"
                      id="inputEmail3"
                      placeholder="Deliver Address"
                      /* onChange={(e) =>
                        setInfo({ ...info, address: e.target.value })
                      } */
                      {...register('address', { required: true })}
                    ></textarea>
                    {errors.address && <p style={{ color: 'red', paddingTop: '5px' }}>This field is required.</p>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label"></label>
                  <div className="col-sm-6">
                    <button
                      /* onClick={() => confirmOrder()} */
                      className="btn btn-warning"
                      type="submit"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
