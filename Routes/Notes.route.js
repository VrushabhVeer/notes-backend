const { Router } = require("express");
const { NoteModel } = require("../Model/Notes.model");

const notesRouter = Router();

//get
notesRouter.get("/", async (req, res) => {
    const result = await NoteModel.find({ user_id: req.body.user_id });
    res.send(result);
});

//post
notesRouter.post("/create", async (req, res) => {
    const { title, notes, tag, user_id } = req.body;
    const note = new NoteModel({
        title,
        notes,
        tag,
        user_id,
    });
    await note.save();
    res.send(note);
});

//patch
notesRouter.patch("/edit/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const note = await NoteModel.findOne({
            _id: id,
            user_id: req.body.user_id,
        });

        if (req.body.title) {
            note.title = req.body.title;
        }

        if (req.body.note) {
            note.note = req.body.note;
        }

        if (req.body.tag) {
            note.tag = req.body.tag;
        }

        await note.save();
        res.send(note);
    } catch (error) {
        res.status(404);
        res.send({ error: "Note doesn't found" });
    }
});

//delete
notesRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const deleteNote = await NoteModel.findOneAndDelete({ _id: id, user_id: req.body.user_id });
    if(deleteNote) {
        res.send({msg : "deleted"});
    }else {
        res.send({ msg: "Note doesn't found" });
    }
});

module.exports = {
    notesRouter,
};
