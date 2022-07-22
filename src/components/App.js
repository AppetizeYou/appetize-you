import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Navigation from "./Navigation";
import Footer from "./Footer";

const App = () => {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="recipes" element={<Recipes />}>
                    <Route path=":id" element={<RecipeDetail /> } />
                </Route>
                <Route path="auth">
                    <Route path="sign_in" element={<SignIn />} />
                    <Route path="sign_up" element={<SignUp />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
