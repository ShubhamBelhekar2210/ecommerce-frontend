import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddProduct({
    refreshProducts,
    selectedProduct,
    clearEdit
}) {

    const [product, setProduct] = useState({
        id: null,
        name: "",
        price: "",
        quantity: ""
    });

    // Edit button click hone par form fill karega
    useEffect(() => {

        if (selectedProduct) {

            setProduct(selectedProduct);

        }

    }, [selectedProduct]);

    // Input change handle
    const handleChange = (e) => {

        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    // Add ya Update product
    const saveProduct = async (e) => {

        e.preventDefault();

        try {

            // UPDATE
            if (product.id) {

                await axios.put(
                    "https://ecommerce-backend-sovd.onrender.com/products/${product.id}",
                    product
                );

                toast.success("Product Updated Successfully");

            } else {

                // ADD
                await axios.post(
                    "https://ecommerce-backend-sovd.onrender.com/products",
                    product
                );

                toast.success("Product Added Successfully");
            }

            // Form reset
            setProduct({
                id: null,
                name: "",
                price: "",
                quantity: ""
            });

            // Edit mode clear
            clearEdit();

            setProduct({
                name: "",
                price: "",
                quantity: ""
            });

            clearEdit();

            window.location.reload();

        } catch (error) {

            toast.error("Something went wrong");

        }
    };

    return (

        <div className="container mt-4">

            <h2 className="mb-4">

                {
                    product.id
                        ? "Update Product"
                        : "Add Product"
                }

            </h2>

            <form onSubmit={saveProduct}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Product Name"
                    className="form-control mb-3"
                    value={product.name}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Enter Price"
                    className="form-control mb-3"
                    value={product.price}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Enter Quantity"
                    className="form-control mb-3"
                    value={product.quantity}
                    onChange={handleChange}
                />

                <button className="btn btn-success">

                    {
                        product.id
                            ? "Update Product"
                            : "Add Product"
                    }

                </button>

            </form>

        </div>
    );
}

export default AddProduct;