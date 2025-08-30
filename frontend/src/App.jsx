import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

export default function App() {
  return (
    <header>
      <SignedOut>
        {/* <SignInButton mode="modal" /> */}
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </SignedIn>
    </header>
  );
}
