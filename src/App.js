import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { InitHomeLoanProvider } from "./HomeLoans/HomeLoanContext";
import HomeLoansForm from "./HomeLoans/HomeLoanForm";

function App() {
  return (
    <div className="App" style={{ maxWidth: "800px" }}>
      <InitHomeLoanProvider>
        <HomeLoansForm />
      </InitHomeLoanProvider>
    </div>
  );
}

export default App;
