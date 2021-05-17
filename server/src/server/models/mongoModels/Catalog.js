const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const schema = new Schema({
  userId: {
    type: 'Number',
    required: true,
  },
  catalogName: {
    type: 'String',
    required: true,
  },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: false,
      unique: false,
    },
  ],
});

const Catalog = model('Catalog', schema);

module.exports = Catalog;
