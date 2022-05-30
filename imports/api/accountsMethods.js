import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import SimpleSchema from "simpl-schema";

SimpleSchema.defineValidationErrorTransform((error) => {
  const ddpError = new Meteor.Error(error.message);
  ddpError.error = "validation-error";
  ddpError.details = error.details;
  return ddpError;
});

const userSchema = new SimpleSchema(
  {
    _id: { type: String },
    birthdate: { type: Date },
    sexo: {
      type: String,
      allowedValues: ["M", "F"],
    },
    empresa: { type: String },
  },
  { check }
);

Meteor.methods({
  "account.update"({ _id, birthdate, sexo, empresa }) {
    userSchema.validate({
      _id,
      birthdate,
      sexo,
      empresa,
    });

    if (!this.userId) throw new Meteor.Error("Not authorized.");

    const user = Meteor.user();
    if (user._id !== this.userId) throw new Meteor.Error("Access Denied");

    Meteor.users.update(_id, {
      $set: {
        profile: { birthdate, sexo, empresa },
      },
    });
  },
});
