import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/db/TasksCollection";

import "../imports/api/tasksMethods";
import "../imports/api/tasksPublications";

const insertTask = (taskName, taskDescription, taskStatus, user) =>
  TasksCollection.insert({
    userId: user._id,
    author: user.username,
    name: taskName,
    description: taskDescription,
    status: taskStatus,
    date: new Date(),
    createdAt: new Date(),
  });

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
    Accounts.createUser({
      username: "teste",
      password: "senha",
    });
  }

  const userteste = Accounts.findUserByUsername("teste");
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskName) =>
      insertTask(taskName, "lorem impsum description", "cadastrada", user)
    );

    [
      "tarefa teste 1",
      "tarefa teste 2",
      "tarefa teste 3",
      "tarefa teste 4",
      "tarefa teste 5",
    ].forEach((taskName) =>
      insertTask(taskName, "lorem impsum description", "cadastrada", userteste)
    );
  }
});
