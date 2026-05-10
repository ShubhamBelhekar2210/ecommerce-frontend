import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        const items =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCartItems(items);

    }, []);

    const removeFromCart = (index) => {

        let updatedCart = [...cartItems];

        updatedCart.splice(index, 1);

        setCartItems(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        toast.success("Item Removed");
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price,
        0
    );

    return (

        <div className="container mt-4">

            <h1 className="text-center mb-4">
                Shopping Cart
            </h1>

            {
                cartItems.length === 0 ? (

                    <h3 className="text-center text-danger">
                        Cart is Empty
                    </h3>

                ) : (

                    <>
                        <div className="row">

                            {
                                cartItems.map((item, index) => (

                                    <div
                                        className="col-md-4 mb-4"
                                        key={index}
                                    >

                                        <div className="card shadow p-3">

                                            <h3>{item.name}</h3>

                                            <h5 className="text-success">
                                                ₹ {item.price}
                                            </h5>

                                            <p>
                                                Quantity : {item.quantity}
                                            </p>

                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    removeFromCart(index)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                        <h3 className="text-end">
                            Total : ₹ {totalPrice}
                        </h3>

                        <div className="text-end mt-3">

                            <Link
                                to="/checkout"
                                className="btn btn-success"
                            >
                                Proceed To Checkout
                            </Link>

                        </div>
                    </>
                )
            }

        </div>
    );
}

export default Cart;