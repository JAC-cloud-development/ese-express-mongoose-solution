import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String }
});

export default mongoose.model('Item', itemSchema);