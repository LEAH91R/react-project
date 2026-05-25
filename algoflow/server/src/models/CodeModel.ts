import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
    code: { type: String, required: true },
    expectedTime: { type: Number, required: true },
    actualTime: { type: Number }
});

const Code = mongoose.model('Code', codeSchema);
export default Code;