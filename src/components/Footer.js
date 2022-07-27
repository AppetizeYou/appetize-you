import { Link } from "react-router-dom";
import "./styles/Footer.scss";

const Footer = () => {
    return (
        <footer>
            <div id="links">
                <Link to="/">Home</Link>
                <Link to="/">About</Link>
                <Link to="/">Support</Link>
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Terms of Services</Link>
            </div>
            <div id="copyright">
                Copyright&#169; <Link to="/">Appetize You</Link>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
