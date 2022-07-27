import { useGlobalState } from "../utilities/context";
import { Link, useNavigate } from "react-router-dom";

import images from "../utilities/images";

import "./styles/Navigation.scss"

const Navigation = () => {
    const navigate = useNavigate();

    const { store, dispatch } = useGlobalState();
    const { user } = store;

    const logout = (event) => {
        event.preventDefault();

        dispatch({
            type: "setUser",
            data: null,
        });

        navigate("/");
    };

    return (
        <nav>
            <Link to="/">
                <img src={images.logo} alt="logo" />
            </Link>
            <div>
                <Link to="/recipes">Recipes</Link>
                {user ? (
                    <>
                        <Link to="/recipes/new">Post recipe</Link>
                        <Link to="/auth/profile">{user.username}</Link>
                        <Link to="/" onClick={logout}>
                            Log out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/auth/login">Log in</Link>
                        <Link to="/auth/signup">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
