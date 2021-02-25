class InvalidArgumentError extends Error {
    constructor(mensagem){
        super(mensagem)
        this.name = 'InvalidArgumentError'
    }
}

class ExpirationError extends Error{
    constructor(mensagem){
        super(mensagem)
        this.name = 'ExpirationError'
    }
}

module.exports = {
    InvalidArgumentError : InvalidArgumentError,
    ExpirationError: ExpirationError
}