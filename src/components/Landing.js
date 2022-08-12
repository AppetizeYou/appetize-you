import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getWeeklyRecipes, getMonthlyRecipes } from "../services/recipe";
import Recipe from "./Recipe";

const Landing = () => {
    // Get weekly and monthly recipes on page initial load
    useEffect(() => {
        getWeeklyRecipes()
            .then((data) => {
                setWeeklyRecipes(data);
            })
            .catch((error) => {
                console.log(error);
            });
        getMonthlyRecipes()
            .then((data) => {
                setMonthlyRecipes(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [weeklyRecipes, setWeeklyRecipes] = useState([]);
    const [monthlyRecipes, setMonthlyRecipes] = useState([]);

    return (
        <div style={{ marginTop: "50px" }}>
            <div style={{ margin: "0 20px 20px 20px", display: "flex", flexDirection: "column" }}>
                <Typography variant="h3" sx={{ fontFamily: "roboto", fontWeight: 700, letterSpacing: ".2rem", color: "inherit" }} style={{ marginBottom: "10px" }}>
                    Weekly recipes
                </Typography>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {weeklyRecipes.length > 0 ? (
                        weeklyRecipes.map((recipe, index) => (
                            <div key={index} style={{ margin: "6px", minWidth: "345px" }}>
                                <Recipe recipe={recipe} />
                            </div>
                        ))
                    ) : (
                        <div style={{ height: "300px", display: "flex", alignItems: "center" }}>No recipes uploaded yet!</div>
                    )}
                </div>
            </div>
            <div style={{ margin: "0 20px 20px 20px", display: "flex", flexDirection: "column" }}>
                <Typography variant="h3" sx={{ fontFamily: "roboto", fontWeight: 700, letterSpacing: ".2rem", color: "inherit" }} style={{ marginBottom: "10px" }}>
                    Monthly recipes
                </Typography>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {monthlyRecipes.length > 0 ? (
                        monthlyRecipes.map((recipe, index) => (
                            <div key={index} style={{ margin: "6px", minWidth: "345px" }}>
                                <Recipe recipe={recipe} />
                            </div>
                        ))
                    ) : (
                        <div style={{ height: "300px", display: "flex", alignItems: "center" }}>No recipes uploaded yet!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Landing;
