import React, { useReducer } from "react";
import reducer from "../utilities/reducer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import RecipeForm from "./RecipeForm";
import RecipeDetail from "./RecipeDetail";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Profile from "./Profile";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Context } from "../utilities/context";
import InvalidPage from "./InvalidPage";
import TestEnv from "./TestEnv";
import RecipeEditForm from "./RecipeEditForm";

import "./styles/Main.scss";
import MyRecipes from "./MyRecipes";
import AllRecipes from "./AllRecipes";
import Contact from "./Contact";

const App = () => {
    // initial state of user data
    const initialState = {
        user: JSON.parse(sessionStorage.getItem("user")) || null,
    };
    
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ store, dispatch }}>
            <BrowserRouter>
                <Navigation />
                <div>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="recipes">
                            <Route index element={<AllRecipes />} />
                            <Route path="new" element={<RecipeForm />} />
                            <Route path=":id">
                                <Route index element={<RecipeDetail />} />
                                <Route path="edit" element={<RecipeEditForm />} />
                            </Route>
                            <Route path="myrecipes" element={<MyRecipes />} />
                        </Route>
                        <Route path="auth">
                            <Route index element={<Navigate to="login" replace />} />
                            <Route path="login" element={<LoginForm />} />
                            <Route path="signup" element={<SignUpForm />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                        <Route path="contact" element={<Contact />} />
                        <Route path="testenv" element={<TestEnv />} />
                        <Route path="*" element={<InvalidPage />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </Context.Provider>
    );
};

export default App;
