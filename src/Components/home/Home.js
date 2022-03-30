import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, setAllProducts } from "./HomeSlice";
import Pagination from "../pagination/Pagination";
import { setCurrentPage, setPage } from "../pagination/PaginationSlice";
import { addProduct } from "../cart/CartSlice";

function Home() {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.products.allProducts);
    const { page, currentPage, itemsPerPage, displayPages } = useSelector(state => state.pagination)
    const { cartItems } = useSelector(state => state.cart);
    console.log(cartItems);
    const [sortBy, setSortBy] = useState();

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);


    const addProductToCart = (product) => {
        // console.log(product);
        dispatch(addProduct(product));
    };

    const sort = (value) => {
        // console.log(value)
        let arr = [...allProducts];
        if (value === "High to Low") {
            arr = arr.sort((a, b) => b.price - a.price);
        } else if (value === "Low to High") {
            arr = arr.sort((a, b) => a.price - b.price);
        } else {
            dispatch(getAllProducts());
        }

        dispatch(setAllProducts(arr));
        setSortBy(value);
        dispatch(setCurrentPage(1));
        dispatch(setPage(1));
    };

    let elements = [];
    const filteredProducts = allProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    let rows = Math.ceil(filteredProducts.length / 4);
    console.log(rows);
    for (let i = 0; i < rows; i++) {
        let element = [];
        for (let j = 4 * i; j < filteredProducts.length && j < 4 * i + 4; j++) {
            const bgColor =
                j % 4 === 0
                    ? "info"
                    : j % 4 === 1
                        ? "success"
                        : j % 4 === 2
                            ? "warning"
                            : "danger";
            element.push(
                <div key={j} className="col-md-3">
                    <div className={`bg-${bgColor}`}>
                        <img
                            src={`http://interviewapi.ngminds.com/${filteredProducts[j].image}`}
                            width="100"
                            height="200"
                        />
                        <br />
                        <br />
                        <div style={{ height: '5rem' }}>{filteredProducts[j].name}</div>
                        <p>
                            <i className="fa fa-inr"></i>
                            {filteredProducts[j].price}
                        </p>
                        <Link
                            to={""}
                            className="btn btn-warning"
                            onClick={() => addProductToCart(filteredProducts[j])}
                        >
                            Add to Cart
                        </Link>
                    </div>
                </div>
            );
        }
        // console.log(element);
        elements.push(
            <div key={i}>
                <div className="row">{element}</div>
                <hr />
            </div>
        );
    }
    console.log(elements);

    return (
        <div className="container">
            <h1>
                <Link to="/">My Ecommerce Site</Link>
                <span className="pull-right">
                    <Link to={"/Cart"}>Cart ({cartItems.length})</Link>
                </span>
            </h1>
            <hr />
            <div className="row">
                <div className="col-sm-12">
                    <div style={{ margin: "25px 0" }}>
                        <label htmlFor="" className="control-label">
                            Sort by:
                        </label>
                        <select name="" id="" onChange={(e) => sort(e.target.value)}>
                            <option value="">Default</option>
                            <option value="High to Low">High to Low</option>
                            <option value="Low to High">Low to High</option>
                        </select>
                    </div>
                </div>
            </div>
            {elements}

            <Pagination />
        </div >
    );
}

export default Home;

/* let rows = (allProducts.length - allProducts.length % 4) / 4 + 1;
 console.log(rows); */

/* let elements;
for (let i = 0; i < rows; i++) {
    let element;
    for (let j = 4 * i; j < allProducts.length && 4 * i + 4; j++) {
        const bgColor = j % 4 === 0 ? 'info' : j % 4 === 1 ? 'success' : j % 4 === 2 ? 'warning' : 'danger';
        element += <div className="col-md-3">
            <div className={`bg-${bgColor}`}>
                <img src={`http://interviewapi.ngminds.com/${allProducts[j].image}`} width="100" height="200" />
                <br /><br />
                <p>{allProducts[j].name}</p>
                <p><i className="fa fa-inr"></i>{allProducts[j].price}</p>
                <Link to={''} className="btn btn-warning" onClick={() => addProductToCart(allProducts[j])}>Add to Cart</Link>
            </div>
        </div>
    }
    elements += <div className='row'>{element}</div>

} */

/* const productS = Array(rows).map((row, idx) => {
    console.log(idx);
    return (
        <div className='row'>
            {
                allProducts.map((product, index) => {
                    const bgColor = index % 4 === 0 ? 'info' : index % 4 === 1 ? 'success' : index % 4 === 2 ? 'warning' : 'danger';
                    if (idx * 4 <= index < idx * 4 + 4) {
                        return (
                            <div key={index}>
                                <div className="col-md-3">
                                    <div className={`bg-${bgColor}`}>
                                        <img src={`http://interviewapi.ngminds.com/${product.image}`} width="100" height="200" />
                                        <br /><br />
                                        <p>{product.name}</p>
                                        <p><i className="fa fa-inr"></i>{product.price}</p>
                                        <Link to={''} className="btn btn-warning" onClick={() => addProductToCart(product)}>Add to Cart</Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}) */
