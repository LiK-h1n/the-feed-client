import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";
import { AuthContext } from "./context/AuthContext";

describe("App Component Sanity Check", () => {
  it("renders the navbar logo correctly", () => {
    render(
      <AuthContext.Provider value={{ user: null, logout: () => {} }}>
        <App />
      </AuthContext.Provider>,
    );

    const logo = screen.getByText("//TheFeed");
    expect(logo).toBeInTheDocument();
  });
});
