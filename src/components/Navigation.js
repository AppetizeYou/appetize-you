import { useGlobalState } from "../utilities/context";
import { Link } from "react-router-dom";

import images from "../utilities/images";

const Navigation = () => {
    const { store, dispatch } = useGlobalState();
    const { user } = store;

    const logout = (event) => {
        event.preventDefault();

        dispatch({
            type: "setUser",
            data: null,
        });
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
                        {/* <Link to="/auth/">Messages</Link> */}
                        <Link to="/recipes/new">Post recipe</Link>
                        <Link to="/auth/profile">{user.username}</Link>
                        <Link to="/" onClick={logout}>
                            Log out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/auth/login">Log in</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
