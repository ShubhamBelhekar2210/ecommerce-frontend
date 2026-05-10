import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand"
                >
                    Ecommerce App
                </Link>

                <div>

                    <Link
                        to="/"
                        className="btn btn-light me-2"
                    >
                        Home
                    </Link>

                    <Link
                        to="/add-product"
                        className="btn btn-warning me-2"
                    >
                        Add Product
                    </Link>

                    <Link
                        to="/cart"
                        className="btn btn-info"
                    >
                        Cart
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;