import React from "react";
import "./style.css";
import { Stack } from "react-bootstrap";

function Header({ title }) {
  return (
    <Stack>
      <header className="header">
        <h1>{title}</h1>
      </header>
    </Stack>
  );
}

export default Header;
