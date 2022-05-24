import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div>
      <p>Bem vindo ao todo list {user.username}</p>
    </div>
  );
};
