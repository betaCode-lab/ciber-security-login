import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requierd: true,
        allowBlank: false,
        minLength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true,
        allowBlank: false,
        minlength: 10
    }, 
    password: {
        type: String,
        minlength: 8,
        required: true,
        allowBlank: false
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
});

userSchema.pre('save', async function() {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

const User = mongoose.model('User', userSchema);

User.prototype.validatePassword = async function(password, hash) {
    const match = await bcrypt.compare(password, hash);
    return match;
}

export default User;