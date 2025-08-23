import mongoose, {Schema} from "mongoose";


const carScheme = new Schema({
    owner: {type: Schema.Types.ObjectId, ref:"userInfo", required:true}, //
    brand: {type: String, required:true}, 
    model: {type: String, required:true},
    image: {type: [String], required:true},
    year: {type: Number, required:true},
    category: {type: String, required:true},
    seating_capacity: {type: Number, required:true},
    fuel_type: {type: String, required:true},
    transmission: {type: String, required:true},
    pricePerDay: {type: Number, required:true},
    location: {type: String, required:true},
    bookedFrom : {type:Date, default:null},
    bookedTo : {type:Date, default: null},
    description: {type: String, required:true},
    isAvailable: {type: Boolean, required:true, default:false}, //
    isApprouved: {type: Boolean, required:true, default:false},
    comments: {type: [String], required:true, default:[]}, //
}, {timestamps:true});

export const carModel = mongoose.models.CarInfo || mongoose.model("CarInfo", carScheme);