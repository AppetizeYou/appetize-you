import { Link } from "react-router-dom";

const Navigation = () => {
    let loggedInUser = true;

    return (
        <nav>
            <Link to="/">Appetize You</Link>
            <div>
                <Link to="/recipes">Recipes</Link>
                {loggedInUser ? (
                    <>
                        {/* <Link to="/auth/">Messages</Link> */}
                        <Link to="/auth/profile">Profile</Link>
                        <Link to="/">Sign out</Link>
                    </>
                ) : (
                    <>
                        <Link to="/auth/sign_in">Sign in</Link>
                        <Link to="/auth/sign_up">Sign up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
