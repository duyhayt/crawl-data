import mongoose from "mongoose";
const { Schema, model } = mongoose;

var JobSchema = new Schema({
    job: String,
    company: String,
    address: String,
    salary: String,
});

export default model('Job', JobSchema);