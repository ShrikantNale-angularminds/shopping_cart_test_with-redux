import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setItemsPerPage, setPage } from './PaginationSlice';

function Pagination() {

    const { page, currentPage, itemsPerPage, displayPages } = useSelector(state => state.pagination)

    const { allProducts } = useSelector(state => state.products);

    const dispatch = useDispatch();

    const handlePage = (page) => {
        dispatch(setCurrentPage(page));
    };

    const handleItemsPerPage = (value) => {
        dispatch(setItemsPerPage(value));
        dispatch(setCurrentPage(1));
        dispatch(setPage(1));
    }
    const setNext = () => {
        if (currentPage === page + displayPages - 1) {
            dispatch(setPage(page + 1));
            dispatch(setCurrentPage(currentPage + 1));
        } else {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const setPrev = () => {
        if (currentPage === page) {
            dispatch(setPage(page - 1));
            dispatch(setCurrentPage(currentPage - 1));
        } else {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    return (
        <div className="row" style={{ userSelect: 'none' }}>
            <div className="col-sm-8">
                <ul className="pagination">
                    <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                        onClick={() => setPrev()}
                        style={{
                            pointerEvents: `${currentPage === 1 ? "none" : ""}`,
                            cursor: "pointer",
                        }}
                    >
                        <a className="page-link">Previous</a>
                    </li>
                    {
                        Array.from({ length: displayPages }, (_, i) => i).map(pageNo => {
                            if (page + pageNo <= Math.ceil(allProducts.length / itemsPerPage)) {
                                return (
                                    <li
                                        key={pageNo}
                                        className={`page-item ${currentPage === page + pageNo ? "active" : ""
                                            }`}
                                        onClick={() => handlePage(page + pageNo)}
                                    >
                                        <a className="page-link">{page + pageNo}</a>
                                    </li>
                                )
                            }
                        })
                    }
                    <li
                        className={`page-item ${currentPage ===
                            Math.floor(allProducts.length / itemsPerPage) + 1
                            ? "disabled"
                            : ""
                            }`}
                        onClick={() => setNext()}
                        style={{
                            pointerEvents: `${currentPage ===
                                Math.floor(allProducts.length / itemsPerPage) + 1
                                ? "none"
                                : ""
                                }`,
                            cursor: 'pointer'
                        }}
                    >
                        <a className="page-link">Next</a>
                    </li>
                </ul>
            </div>

            <div className="col-sm-4 text-right">
                <div style={{ margin: "25px 0" }}>
                    <label htmlFor="" className="control-label">
                        Items Per Page:
                    </label>
                    <select
                        name=""
                        id=""
                        defaultValue={"5"}
                        onChange={(e) => handleItemsPerPage(e.target.value)}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>

        </div>
    )
}

export default Pagination