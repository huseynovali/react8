import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import mongoose from "mongoose";
import TodoSchema from "./Model/TodoSchema.js";
dotenv.config()
const app = express();
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.CONNECT_MD)
    .then(() => console.log("connect db !"))
    .catch(err => console.log(err))


app.post("/api/todos", (req, res) => {
    let newProduct = TodoSchema({
        title: req.body.title,
        complated: req.body.complated,
    })
    newProduct.save()

    res.json(newProduct)



})

app.get("/api/todos", (req, res) => {
    TodoSchema.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


app.get("/api/todo/:id", (req, res) => {
    const id = req.params.id;
    TodoSchema.findById(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

app.delete("/api/deletetodo/:id", (req, res) => {
    const id = req.params.id;
    TodoSchema.findByIdAndRemove(id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


app.put("/api/todo/:id/check", (req, res) => {
    const id = req.params.id;

    TodoSchema.findByIdAndUpdate(id, {
        complated: req.body.complated
    }, { new: true }).then(data => res.json(data))

})

app.delete("/api/deletecomplatedtodo", async (req, res) => {
    try {
        const filter = { complated: true };

        await TodoSchema.deleteMany(filter);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


app.listen(5000, () => console.log("listen..."))

