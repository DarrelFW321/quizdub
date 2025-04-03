import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, trim: true },
  github: { type: String, unique: true, sparse: true },
  google: { type: String, unique: true, sparse: true },
}, { timestamps: true });

// Ensure at least one of github or google is provided
userSchema.pre("save", function (next) {
  if (!this.github && !this.google) {
    return next(new Error("Either GitHub or Google must be provided."));
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;