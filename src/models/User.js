const { Schema, model } = require('mongoose');

const bcrypt = require('bcryptjs'); //Modulo para encriptar passwords


require('mongoose');

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
}, {
    timestamps:true
})

 UserSchema.methods.encryptPassword = async password =>{ //Mongoose permite declarar metodos del model
   const salt = await bcrypt.genSalt(10)   //Encripta el password
   return await bcrypt.hash(password,salt);
};  

UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = model('User',UserSchema);