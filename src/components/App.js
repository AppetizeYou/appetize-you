import React, { useReducer } from "react";
import reducer from "../utilities/reducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Recipes from "./Recipes";
import RecipeDetail from "./RecipeDetail";
import Login from "./Login";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Context } from "../utilities/context";

const App = () => {
    const initialState = {
        username: sessionStorage.getItem("username") || null,
        token: sessionStorage.getItem("token") || null,
    };

    const [store, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ store, dispatch }}>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="recipes" element={<Recipes />}>
                        <Route path=":id" element={<RecipeDetail />} />
                    </Route>
                    <Route path="auth">
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<SignUp />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </Context.Provider>
    );
};

export default App;
