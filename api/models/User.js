const { Schema, model} = require('mongoose')
const Genero = require('../models/Genero')

const UserSchema = new Schema(
    {
        username:{type:String, required:true,unique:true},
        email:{type:String, required:true, unique:true},
        name:{type:String, required:true},
        sobrenome:{type:String, required:false},
        genero:{type:Genero, required:false},
        passWordHash:{type:String, required:true},
        nr_celular:{tyepe:Number, required:false},
        dt_nascimento:{type:Date,required:false}
    }
);

const UserModel = model("User",UserSchema)


module.exports = UserModel