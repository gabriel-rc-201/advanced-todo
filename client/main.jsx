import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { App } from "../imports/ui/App";
import { LoginForm } from "../imports/ui/LoginForm";

Meteor.startup(() => {
  render(
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<LoginForm />} />
        <Route path="/App" element={<App />} />
      </Routes>
    </Router>,
    document.getElementById("react-target")
  );
});
