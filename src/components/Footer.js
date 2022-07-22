import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div>
                <Link to="/">Home</Link>
                <Link to="/">Contact Us</Link>
            </div>
            <div>Copyright&#169; <Link to="/">Appetize You</Link>. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
