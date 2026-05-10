import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductList({
    setSelectedProduct
}) {

    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [sortBy, setSortBy] = useState("id");
    const [totalPages, setTotalPages] = useState(0);
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getProducts = async () => {

        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:8080/products?page=${page}&size=${size}&sortBy=${sortBy}`
            );
            console.log(response.data);

            setProducts(response.data.content);
            setLoading(false);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const searchProducts = async (value) => {

        try {

            setKeyword(value);

            if (value.trim() === "") {
                getProducts();
                return;
            }

            const response = await axios.get(
                `http://localhost:8080/products/search/${value}`
            );

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `http://localhost:8080/products/${id}`
            );

            toast.success("Product Deleted Successfully");

            getProducts();

        } catch (error) {

            toast.error("Delete Failed");

        }
    };

    const addToCart = (product) => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        toast.success("Product Added To Cart");
    };

    useEffect(() => {
        getProducts();
    }, [page, sortBy, getProducts]);

    return (

        <>
            <div className="container mt-4">

                <h1 className="text-center mb-4">
                    All Products
                </h1>

                <input
                    type="text"
                    placeholder="Search product..."
                    className="form-control mb-4"
                    value={keyword}
                    onChange={(e) => searchProducts(e.target.value)}
                />

                <select
                    className="form-select mb-4"
                    onChange={(e) => setSortBy(e.target.value)}
                >

                    <option value="id">Sort By ID</option>
                    <option value="name">Sort By Name</option>
                    <option value="price">Sort By Price</option>

                </select>

                {
                    loading && (

                        <h3 className="text-center">
                            Loading...
                        </h3>

                    )
                }

                <div className="row">

                    {
                        !loading && products.length === 0 && (

                            <h3 className="text-center text-danger">
                                No Products Found
                            </h3>

                        )
                    }

                    {products.map((product) => (

                        <div className="col-md-4 mb-4" key={product.id}>

                            <div className="card shadow p-3">

                                <h3>{product.name}</h3>

                                <h5 className="text-success">
                                    ₹ {product.price}
                                </h5>

                                <p>
                                    Quantity : {product.quantity}
                                </p>

                                <button
                                    className="btn btn-primary mb-2"
                                    onClick={() => addToCart(product)}
                                >
                                    Add To Cart
                                </button>

                                <button
                                    className="btn btn-warning w-100 mb-2"
                                    onClick={() => {

                                        setSelectedProduct(product);

                                        navigate("/add-product");
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

                <div className="d-flex justify-content-center gap-3 mt-4">

                    <button
                        className="btn btn-primary"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span className="mt-2">
                        Page {page + 1}
                    </span>

                    <button
                        className="btn btn-primary"
                        disabled={page === totalPages - 1}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                </div>

            </div>
        </>
    );

}

export default ProductList;