import mongoose from "mongoose";
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
    },
    typeService: {
        type: String,
        required: true,
    },
    investment: {
        type: String,
        required: true
    },
    technologies: {
        type: [String],
    },
    contract: {
        type: String,
    },
    proposal: {
        type: String,
    },
    rating: {
        type: Number,
        min:0,
        max:5,
    },
    price: {
        type: Number,
    }
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);