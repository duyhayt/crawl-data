import { Schema, model } from "mongoose";

const goldSchema = new Schema({
    gold_type: String,
    purchase_price : String,
    sale_price : String
});

export default model('Gold', goldSchema);