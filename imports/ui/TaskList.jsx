import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

import { TasksCollection } from "../db/TasksCollection";
import { Task } from "./Tasks";
import { useNavigate } from "react-router-dom";

const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call("tasks.setIsChecked", _id, !isChecked);
};

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

export const TaskList = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const { tasks, isLoading } = useTracker(() => {
    if (!Meteor.user()) {
      return { tasks: [] };
    }

    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) return { tasks: [], isLoading: true };

    const tasks = TasksCollection.find(
      hideCompleted ? hideCompletedFilter : userFilter,
      { sort: { createdAt: 1 } }
    ).fetch();

    return { tasks };
  });

  const navigate = useNavigate();

  const logout = () => {
    Meteor.logout();
    navigate("/");
  };

  return (
    <div className="main">
      <>
        <div className="user" onClick={logout}>
          {user.username || user.profile.name} 🚪
        </div>
        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? "Show All" : "Hide Completed"}
          </button>
        </div>

        {isLoading && <div className="loading">loading...</div>}

        <ul className="tasks">
          {tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </>
    </div>
  );
};
