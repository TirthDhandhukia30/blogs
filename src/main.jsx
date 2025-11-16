import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import App from "./App.jsx";
import BlogPost from "./BlogPost.jsx";
import TimeTravelPost from "./TimeTravelPost.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog/blackhole-theory" element={<BlogPost />} />
        <Route path="/blog/time-travel" element={<TimeTravelPost />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
