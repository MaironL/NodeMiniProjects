const moongose = require('mongoose');

const JobSchema = new moongose.Schema(
  {
    company: {
      type: String,
      require: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      require: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'decline', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: moongose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = moongose.model('Job', JobSchema);
