import { useState } from "react";


export default function Navbar({ children }) {

    return (
        <nav className="nav-bar">
            {children}
        </nav>
    );
}