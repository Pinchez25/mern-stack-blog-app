const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

// hash the password before saving the user
userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (e) {
        next(e);
    }
});

userSchema.statics.userExists = async function(username) {
    try {
        return await this.findOne({username: username});
    } catch (e) {
        throw e;

    }

}

userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    }catch (e) {
        throw e;
    }
};


const User = model('User', userSchema);

module.exports = User