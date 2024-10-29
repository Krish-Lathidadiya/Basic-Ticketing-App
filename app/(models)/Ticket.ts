import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    priority: {
        type: Number,
    },
    progress: {
        type: Number,
    },
    status: {
        type: String,
    },
    active: {
        type: Boolean,
    }
},{timestamps:true});

export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);
