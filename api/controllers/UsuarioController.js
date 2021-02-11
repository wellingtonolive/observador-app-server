const User = require('../models/User')

class UsuarioController {

    static async buscarTodos(req,res) {
        let resultados = {}
        try{
            resultados = await User.find()
            return res.status(200).json(resultados)
        }
        catch(error){
            res.status(500).json(error.message)
        }
    }
    
    static async signup(req,res){
        let resultados = {teste:'teste'}
        try{
            res.status(200).json(resultados)
        }
        catch(erros){
            res.status(500).json(erros)
        }
    }
}

module.exports = UsuarioController