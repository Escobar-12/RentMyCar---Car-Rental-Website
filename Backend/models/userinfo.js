import mongoose, {Schema} from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    role:
    {
        type:Number,
        default:2000
    },
    img:
    {
        type:String,
        required:true,
        default:"user.png"
    },
    desc:
    {
        type:String,
    },
    savedPosts:{
        type:[Schema.Types.ObjectId],
        default:[]
    },
    createdPosts:{
        type: [Schema.Types.ObjectId],
        default:[]
    },
    addresses: {
        type: [{
            firstName:{type:String, required: true }, 
            lastName:{type:String, required: true }, 
            email:{type:String, required: true }, 
            street:{type:String, required: true }, 
            city:{type:String, required: true }, 
            state:{type:String, required: true }, 
            zipcode:{type:Number, required: true }, 
            country:{type:String, required: true }, 
            phone:{type:String, required: true }
        }],
        default: [],
    },
    orders: {
        type : [Schema.Types.ObjectId],
        ref:"OrdersRecord",
        default: [],
    },
    myBooking: {
        type : [Schema.Types.ObjectId],
        ref:"BookingInfo",
        default: [],
    },
    myCars: {
        type : [Schema.Types.ObjectId],
        ref:"CarInfo",
        default: [],
    },

},{timestamps:true})

export const userModel = mongoose.models.UserInfo || mongoose.model("UserInfo",userSchema);