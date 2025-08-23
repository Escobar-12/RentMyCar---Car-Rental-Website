import mongoose, {Schema} from "mongoose";

const bookingSchema = new Schema({
    car: {type: Schema.Types.ObjectId , ref:"CarInfo", required:true },
    user: {type: Schema.Types.ObjectId, ref:"UserInfo", required:true },
    owner: {type: Schema.Types.ObjectId, ref:"UserInfo" , required:true },
    pickupDate: {type: Date, required:true, default:null },
    returnDate: {type: Date, required:true, default:null },
    pickUpLocation:  {type: String, required:true },
    returnLocation: {type: String, required:true },
    status: {type: String, required:true, default:"Pending"},
    price: {type: Number, required:true, default:0},
}, {timestamps:true});

export const bookingModel = mongoose.models.BookingInfo || mongoose.model("BookingInfo",bookingSchema);