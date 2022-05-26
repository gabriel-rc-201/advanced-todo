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
    text: { type: String },
    author: { type: String },
    description: { type: String },
    status: {
      type: String,
      allowedValues: ["cadastrda", "andamento", "comcluida"],
    },
  },
  { check }
);

Meteor.methods({
  "tasks.insert"(text, author, status, description) {
    schema.validate({ text, author, status, description });

    if (!this.userId) throw new Meteor.Error("Not authorized.");

    TasksCollection.insert({
      userId: this.userId,
      author,
      text,
      description,
      status,
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

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) throw new Meteor.Error("Not authorized");

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) throw new Meteor.Error("Access denied");

    TasksCollection.update(taskId, {
      $set: { isChecked },
    });
  },
});
