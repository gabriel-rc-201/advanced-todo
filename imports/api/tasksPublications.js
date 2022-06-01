import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../db/TasksCollection";

Meteor.publish("tasks", function publishTasks(ClientFilter) {
  return TasksCollection.find({
    $and: [
      { $or: [{ userId: this.userId }, { isPrivate: false }] },
      ClientFilter,
    ],
  });
});
