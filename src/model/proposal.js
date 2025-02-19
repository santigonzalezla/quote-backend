import mongoose from "mongoose";
const { Schema } = mongoose;

const ProposalSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    quotation: {
        type: String,
    },
    mockup: {
        type: String,
    }
}, { timestamps: true });

export default mongoose.model("Proposal", ProposalSchema);