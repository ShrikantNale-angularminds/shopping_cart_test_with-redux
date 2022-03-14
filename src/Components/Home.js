import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {

    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') === null ? 0 : JSON.parse(localStorage.getItem('cartItems')).length);
    const [sortBy, setSortBy] = useState();
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    // console.log(cartItems);
    console.log(allProducts.length,Math.floor(allProducts.length / itemsPerPage));

    useEffect(() => {
        getAllProducts();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
        setPage(1);
    }, [itemsPerPage])

    const getAllProducts = async () => {
        const res = await axios.get(`http://interviewapi.ngminds.com/api/getAllProducts`);
        setAllProducts(res.data.products);
        // console.log(res.data.products)
    }

    const addProductToCart = (product) => {
        // console.log(product);
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems === null) {
            let arr = [];
            product = { ...product, quantity: 1 }
            arr.push(product);
            localStorage.setItem('cartItems', JSON.stringify(arr));
            setCartItems(arr.length);
        } else {
            let arr = JSON.parse(localStorage.getItem('cartItems'));
            console.log(arr.filter((item) => item._id === product._id).length);
            const item = arr.filter((item) => item._id === product._id)
            if (item.length > 0) {
                // console.log(product.quantity);
                arr = arr.map((item) => item._id !== product._id ? item : { ...item, quantity: item.quantity ? item.quantity + 1 : 2 })
                // product = {...product, quantity: item[0].quantity ? item[0].quantity + 1 : 2}
                console.log(arr);
                localStorage.setItem('cartItems', JSON.stringify(arr));
                setCartItems(arr.length);
            } else {
                product = { ...product, quantity: 1 }
                console.log(product);
                arr.push(product);
                localStorage.setItem('cartItems', JSON.stringify(arr));
                setCartItems(arr.length);
            }
        }
    }

    const sort = (value) => {
        // console.log(value)
        let arr = allProducts;
        if (value === 'High to Low') {
            arr = arr.sort((a, b) => b.price - a.price);
        } else if (value === 'Low to High') {
            arr = arr.sort((a, b) => a.price - b.price);
        } else {
            getAllProducts();
        }

        setAllProducts(arr);
        setSortBy(value);
        setCurrentPage(1);
        setPage(1);
    }

    const handlePage = (page) => {
        setCurrentPage(page);
    }

    const setNext = () => {
        if(currentPage === page+2){
            setPage(page+1);
            setCurrentPage(currentPage+1);
        } else {
            setCurrentPage(currentPage+1);
        }
    }

    const setPrev = () => {
        if(currentPage === page){
            setPage(page-1);
            setCurrentPage(currentPage-1);
        } else {
            setCurrentPage(currentPage-1);
        }
    }

    const productEl = allProducts.map((product, index) => {
        const bgColor = index % 4 === 0 ? 'info' : index % 4 === 1 ? 'success' : index % 4 === 2 ? 'warning' : 'danger';
        if (index >= (currentPage - 1) * itemsPerPage && index <= currentPage * itemsPerPage - 1) {
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

    return (
        <div className="container">
            <h1>
                <Link to="/">My Ecommerce Site</Link>
                <span className="pull-right">
                    <Link to={'/Cart'}>Cart ({cartItems})</Link>
                </span>
            </h1>
            <hr />
            <div className="row">
                <div className="col-sm-12">
                    <div style={{ margin: "25px 0" }}>
                        <label htmlFor="" className="control-label">Sort by:</label>
                        <select name="" id="" onChange={(e) => sort(e.target.value)}>
                            <option value="">Default</option>
                            <option value="High to Low">High to Low</option>
                            <option value="Low to High">Low to High</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">

                {productEl}

            </div>
            <hr />

            <div className="row">
                <div className="col-sm-8">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage ===1 ? 'disabled' : ''}`} onClick={() => setPrev()} style={{pointerEvents: `${currentPage === 1 ? 'none' : ''}`}}><a className="page-link">Previous</a></li>
                        <li className={`page-item ${currentPage === page ? 'active' : ''}`} onClick={() => handlePage(page)}><a className="page-link">{page}</a></li>
                        {page+1 <= Math.floor(allProducts.length / itemsPerPage)+1 && <li className={`page-item ${currentPage === page+1 ? 'active' : ''}`} onClick={() => handlePage(page+1)}><a className="page-link">{page+1}</a></li>}
                        {page+2 <= Math.floor(allProducts.length / itemsPerPage)+1 && <li className={`page-item ${currentPage === page+2 ? 'active' : ''}`} onClick={() => handlePage(page+2)}><a className="page-link">{page+2}</a></li>}
                        <li className={`page-item ${currentPage === Math.floor(allProducts.length / itemsPerPage)+1 ? 'disabled' : ''}`} onClick={() => setNext()} style={{pointerEvents: `${currentPage === Math.floor(allProducts.length / itemsPerPage)+1 ? 'none' : ''}`}}><a className="page-link">Next</a></li>
                    </ul>
                </div>
                <div className="col-sm-4 text-right">
                    <div style={{ margin: "25px 0" }}>
                        <label htmlFor="" className="control-label">Items Per Page:</label>
                        <select name="" id="" defaultValue={'5'} onChange={(e) => setItemsPerPage(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home







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
