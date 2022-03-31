import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    type: {
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: String,
    }
  });

  const Account = mongoose.model('Account', accountSchema);

export default Account;