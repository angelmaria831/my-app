import {Schema, model, models} from "mongoose";

const userSchema = new Schema({
    fname: {
        type : String,
        required : [true, "Please provide your first name"],
    },
    lname: {
        type : String,
        required : [true, "Please provide your last name"],
    },
    username :{
        type : String,
        required : [true, "Please provide a username"],
        unique : true
    },
    email : {
        type : String,
        required : [true, "Please provide an email"],
        unique :true
    },
    password : {
        type : String,
        required : [true, "Please provide a password"]
    },
    isAdmin : {
        type :Boolean,
        default : false
    }

})

const User = models.users || model("users", userSchema)

export default User;