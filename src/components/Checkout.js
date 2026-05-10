import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Checkout() {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        phone: ""
    });

    const handleChange = (e) => {

        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };

    const placeOrder = async () => {

        if (
            !customer.name ||
            !customer.address ||
            !customer.phone
        ) {

            toast.error("Please Fill All Fields");

            return;
        }

        try {

            const cartItems =
                JSON.parse(localStorage.getItem("cart")) || [];

            const totalPrice = cartItems.reduce(
                (total, item) => total + item.price,
                0
            );

            const orderData = {

                customerName: customer.name,
                address: customer.address,
                phone: customer.phone,
                totalPrice: totalPrice
            };

            await axios.post(
                "http://localhost:8080/orders",
                orderData
            );

            localStorage.setItem(
                "customer",
                JSON.stringify(customer)
            );

            toast.success("Order Placed Successfully");

            localStorage.removeItem("cart");

            navigate("/receipt");

        } catch (error) {

            console.log(error);

            toast.error("Order Failed");
        }
    };

    return (

        <div className="container mt-4">

            <h1 className="text-center mb-4">
                Checkout
            </h1>

            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="form-control mb-3"
                onChange={handleChange}
            />

            <input
                type="text"
                name="address"
                placeholder="Enter Address"
                className="form-control mb-3"
                onChange={handleChange}
            />

            <input
                type="text"
                name="phone"
                placeholder="Enter Phone"
                className="form-control mb-3"
                onChange={handleChange}
            />

            <button
                className="btn btn-success"
                onClick={placeOrder}
            >
                Place Order
            </button>

        </div>
    );
}

export default Checkout;