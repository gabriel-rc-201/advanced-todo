import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/db/TasksCollection";

function insertLink({ title, url }) {
  TasksCollection.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    insertLink({
      title: "Do the Tutorial",
      url: "https://www.meteor.com/tutorials/react/creating-an-app",
    });

    insertLink({
      title: "Follow the Guide",
      url: "http://guide.meteor.com",
    });

    insertLink({
      title: "Read the Docs",
      url: "https://docs.meteor.com",
    });

    insertLink({
      title: "Discussions",
      url: "https://forums.meteor.com",
    });
  }
});
