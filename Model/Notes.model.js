const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: { type: String, required: true },
    notes: { type: String, required: true },
    tag: { type: String, required: true },
    user_id: { type: String, required: true }
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
    NoteModel,
};
