import { Link } from "react-router-dom";
import { useGlobalState } from "../utilities/context";

const Navigation = () => {
    const { store, dispatch } = useGlobalState();
    const { user } = store;

    return (
        <nav>
            <Link to="/">Appetize You</Link>
            <div>
                <Link to="/recipes">Recipes</Link>
                {user ? (
                    <>
                        {/* <Link to="/auth/">Messages</Link> */}
                        <Link to="/auth/profile">{user.username}</Link>
                        <Link to="/">Log out</Link>
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
