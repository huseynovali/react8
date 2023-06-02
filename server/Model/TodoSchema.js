import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
    title: {
        type: String
    },
    complated: {
        type: Boolean
    }
})



export default mongoose.model("todo", TodoSchema)