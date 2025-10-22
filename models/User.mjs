// backend/models/User.mjs
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { 
     type: String,
     required: true, 
     trim: true 
    },
  email: { 
    type: String, 
    required: true,
    unique: true, 
    lowercase: true,
     trim: true 
    },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  role: { type: String,
     enum: ['user', 'admin'], 
     default: 'user' 
    }
}, { timestamps: true });

/////  Hash password before save  /////
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  }catch (err) {
    return next(err);
  }
});

////// Instance method to compare password ///////
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;
