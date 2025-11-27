// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LearnMore from "./pages/LearnMore";

/**
 * AppContent is a child component that consumes ThemeContext via useTheme.
 * ThemeProvider wraps AppContent so useTheme works correctly.
 */
function AppContent({ search, setSearch }) {
  const { dark } = useTheme(); // now valid because ThemeProvider is above

  return (
    <Router>
      <div
        // apply classes based on theme. We don't rely on html.dark here.
        className={
          (dark
            ? "min-h-screen flex flex-col bg-gray-900 text-gray-100"
            : "min-h-screen flex flex-col bg-gray-50 text-gray-900")
          + " transition-colors duration-300"
        }
      >
        <Navbar onSearch={setSearch} />

        <main className="max-w-6xl mx-auto p-6 flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard searchTerm={search} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/learn-more" element={<LearnMore />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

function App() {
  const [search, setSearch] = useState("");

  return (
    <ThemeProvider>
      <AppContent search={search} setSearch={setSearch} />
    </ThemeProvider>
  );
}

export default App;
