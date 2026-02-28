import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Newblog from "./pages/Newblog.jsx";
import Allblogs from "./pages/Allblogs.jsx";
import Editblog from "./pages/Editblog.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import Profile from "./pages/Profile.jsx";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      {/* Show the user button when the user is signed in */}
      <SignedIn>
        <UserButton />
      </SignedIn>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/new" element={<Newblog />} />
        <Route path="/all" element={<Allblogs />} />
        <Route path="/edit/:id" element={<Editblog />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </ClerkProvider>
   
  </StrictMode>,
);