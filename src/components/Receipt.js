import { useEffect, useState } from "react";

function Receipt() {

    const [cart, setCart] = useState([]);
    const [customer, setCustomer] = useState({});

    useEffect(() => {

        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const savedCustomer =
            JSON.parse(localStorage.getItem("customer")) || {};

        setCart(savedCart);
        setCustomer(savedCustomer);

    }, []);

    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

    const printReceipt = () => {

        window.print();
    };

    return (

        <div className="container mt-5">

            <div className="card p-4 shadow">

                <h1 className="text-center mb-4">
                    Receipt
                </h1>

                <hr />

                <h4>Customer Details</h4>

                <p>
                    <strong>Name:</strong>
                    {" "}
                    {customer.name}
                </p>

                <p>
                    <strong>Address:</strong>
                    {" "}
                    {customer.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    {" "}
                    {customer.phone}
                </p>

                <hr />

                <h4>Products</h4>

                {
                    cart.map((item) => (

                        <div
                            key={item.id}
                            className="border p-3 mb-3 rounded"
                        >

                            <h5>{item.name}</h5>

                            <p>
                                Price: ₹{item.price}
                            </p>

                            <p>
                                Quantity: {item.quantity}
                            </p>

                        </div>
                    ))
                }

                <hr />

                <h3 className="text-success">
                    Total: ₹{total}
                </h3>

                <button
                    className="btn btn-dark mt-3"
                    onClick={printReceipt}
                >
                    Print Receipt
                </button>

            </div>

        </div>
    );
}

export default Receipt;