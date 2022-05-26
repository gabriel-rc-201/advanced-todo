import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection";
import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  ddpError.details = error.details;
  return ddpError;
});

const schema = new SimpleSchema(
  {
    name: { type: String },
    author: { type: String },
    description: { type: String },
    date: { type: Date },
    status: {
      type: String,
      allowedValues: ["cadastrada", "andamento", "comcluida"],
    },
  },
  { check }
);

Meteor.methods({
  "tasks.insert"(name, author, status, description, date) {
    schema.validate({ name, author, status, description, date });

    if (!this.userId) throw new Meteor.Error("Not authorized.");

    TasksCollection.insert({
      userId: this.userId,
      author,
      name,
      description,
      status,
      date,
      createdAt: new Date(),
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) throw new Meteor.Error("Not authorized.");

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) throw new Meteor.Error("Access denied");

    TasksCollection.remove(taskId);
  },

  "tasks.edit"(taskUpdated) {
    const { _id, name, description, author, status, date } = taskUpdated;

    schema.validate({ name, author, status, description, date });

    check(_id, String);

    if (!this.userId) throw new Meteor.Error("Not authorized");

    const task = TasksCollection.findOne({
      _id,
      userId: this.userId,
    });

    if (!task) throw new Meteor.Error("Access denied");

    TasksCollection.update(_id, {
      $set: { name, description, status, date, updatedAt: new Date() },
    });
  },
});
