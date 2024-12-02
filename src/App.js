import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import Captcha from "./components/Captcha/Captcha";

function App() {
  return (
    <div className="App">
      <Header title="Sav Employee List" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Captcha />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
