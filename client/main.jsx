import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { App } from "../imports/ui/App";
import { LoginForm } from "../imports/ui/LoginForm";
import { ProtectedRoutes } from "../imports/tools/ProtectedRoutes";
import { TaskList } from "../imports/ui/TaskList";
import { EdtiTask } from "../imports/ui/EditTask";
import { Profile } from "../imports/ui/Profile";
import { CreateAccountForm } from "../imports/ui/CreateAccountForm";

Meteor.startup(() => {
  render(
    <Router>
      <Routes>
        <Route path="/" exact={true} element={<LoginForm />} />
        <Route path="/CreateAccount" element={<CreateAccountForm />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/App" element={<App />} />
          <Route path="/Tasks" element={<TaskList />} />
          <Route path="/EditTask" element={<EdtiTask />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>,
    document.getElementById("react-target")
  );
});
