import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default:"https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg" },
    addresse: { type: String},
    gender : {type:String,default:"Not selected"},
    dob : {type:String,default:"Not selected"},
    phone: {type:String,default:"0000000000"},


})

const userModel = mongoose.model.user || mongoose.model('user', userSchema)

export default userModel