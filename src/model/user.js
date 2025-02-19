import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifyToken: {
        type: String
    },
    projects: {
        type: [String],
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('User',UserSchema);