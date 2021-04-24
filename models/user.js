const mongoose = require("mongoose");

const {schema}=require('./secure/userValidation');
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "نام و نام خانوادگی الزامی می باشد"],
        trim: true,
    },
    email: {
        type: String,
        required: [true,"ایمیل الزامی است"],
        unique: [true,"ایمیل قبلا وارد شده است"],
    },
    password: {
        type: String,
        required: [true,"وارد کردن کلمه عبور الزامی است"],
        minlength: [4,"مقداری بیشتر راز 4 کاراکتر باید وارد شود"],
        maxlength: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



userSchema.statics.userValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
