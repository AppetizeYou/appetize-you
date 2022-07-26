import React, { useReducer } from "react";
import reducer from "../utilities/reducer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Recipes from "./Recipes";
import RecipeForm from "./RecipeForm";
import RecipeDetail from "./RecipeDetail";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Context } from "../utilities/context";
import InvalidPage from "./InvalidPage";
import TestEnv from "./TestEnv";

const App = () => {
    const initialState = {
        user: JSON.parse(sessionStorage.getItem("user")) || null,
    };

    const [store, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ store, dispatch }}>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="recipes">
                        <Route index element={<Recipes />} />
                        <Route path="new" element={<RecipeForm />} />
                        <Route path=":id" element={<RecipeDetail />} />
                    </Route>
                    <Route path="auth">
                        <Route index element={<Navigate to="login" replace />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="signup" element={<SignUp />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                    <Route path="testenv" element={<TestEnv />} />
                    <Route path="*" element={<InvalidPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </Context.Provider>
    );
};

export default App;
