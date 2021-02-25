const nodemailer = require('nodemailer');


class Email {


    async enviaEmail(usuario) {
        const transportador = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth:{
                user:'desenvolvimentosoftwares11@gmail.com',
                pass:'Desenvolvimento2021@123'
            }
        });
        const info = await transportador.sendMail(this);
    }
}

class EmailVerificacao extends Email {
    constructor(usuario, endereco){
        super();
        this.from = '"Observador APP " <desenvolvimentosoftwares11@gmail.com>;';
        this.to = usuario.email;
        this.subject = 'Verificação de E-mail';
        this.text = 'Olá API em Node JS';
        this.html = ` <h1>Olá API em Node JS</h1>Parabéns por se Cadastrar na Nossa Aplicação OBSERVADOR EHHEHE : <a href=">${endereco}</a> `;
    }
}




module.exports = { EmailVerificacao }