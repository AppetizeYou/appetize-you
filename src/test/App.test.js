import React from "react";
import { render } from "@testing-library/react";
import Landing from "../components/Landing";
import Contact from "../components/Contact";

describe("Landing page renders:", () => {
    it("0. without any errors", async () => {
        const isLoaded = await render(<Landing />);

        expect(isLoaded).toBeTruthy();
    });

    it("1. Weekly recipes as a heading", async () => {
        const { getByText } = await render(<Landing />);

        expect(getByText("Weekly recipes")).toBeInTheDocument();
    });

    it("2. Monthly recipes as a heading", async () => {
        const { getByText } = await render(<Landing />);

        expect(getByText("Monthly recipes")).toBeInTheDocument();
    });
});

describe("Contact page renders:", () => {
    it("0. without any errors", async () => {
        const isLoaded = await render(<Contact />);

        expect(isLoaded).toBeTruthy();
    });

    it("1. with three text input fields", async () => {
        const { getAllByRole } = await render(<Contact />);

        expect(getAllByRole("textbox").length).toEqual(3);
    });

    it("2. with one button", async () => {
        const { getByRole } = await render(<Contact />);

        expect(getByRole("button")).toBeInTheDocument();
    });
});