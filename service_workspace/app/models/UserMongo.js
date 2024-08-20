const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id : mongoose.Schema.Types.ObjectId,
  task: String,
  check: Boolean
});

const checkListSchema = new mongoose.Schema({
  id : mongoose.Schema.Types.ObjectId,
  title: String,
  position: Number,
  tasks: [taskSchema]
});

const cardSchema = new mongoose.Schema({
  id : mongoose.Schema.Types.ObjectId,
  position: Number,
  title: String,
  note: String,
  checksList: [checkListSchema]
});

const sectionSchema = new mongoose.Schema({
  id : mongoose.Schema.Types.ObjectId,
  position: Number,
  title: String,
  cards: [cardSchema]
});

const workspaceSchema = new mongoose.Schema({
  
  owner: {
    name: String,
    email: String,
    password: String,
    validated: Boolean,

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ]
  },
  
  WorkSpaces: [
    {
      id : mongoose.Schema.Types.ObjectId,
      name: String,
      sections: [sectionSchema]
    }
  ]
  
});

const WorkspaceModel = mongoose.model('Workspace', workspaceSchema);

module.exports = WorkspaceModel;
