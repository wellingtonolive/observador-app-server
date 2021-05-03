module.exports = {
  dadosUsuario(campos, erros) {
    if (
      !campos.username ||
      typeof campos.username !== "string" ||
      campos.username.length < 5
    ) {
      erros.username = "Deve ter no mínimo 5 caracteres";
    }

    if (
      !campos.name ||
      typeof campos.name !== "string" ||
      campos.name.length > 50
    ) {
      erros.name = "Deve ter no máximo 50 caracteres.";
    }

    if (
      !campos.email ||
      typeof campos.email !== "string" ||
      !campos.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
    ) {
      erros.email = "E-mail Obrigatório e deve ser válido";
    }

    if (
      !campos.password ||
      !campos.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ) {
      erros.password =
        "Mínimo de 8 caracteres, com uma letra maiúscula, uma letra minúscula, um número e um caractere especial";
    }

    if (!campos.sobrenome || typeof campos.sobrenome !== "string") {
      erros.sobrenome = "Sobrenome é obrigatório";
    }

    if (!campos.genero || typeof campos.genero !== "string") {
      erros.genero = "Gênero é obrigatório";
    }

    if (
      typeof campos.nr_celular !== "string" ||
      typeof campos.nr_celular !== "number"
    ) {
      erros.nr_celular = "Formato Inválido informado para o nr_celular";
    }

    if (typeof campos.dt_nascimento !== "string") {
      erros.dt_nascimento = "Formato Inválido informado para o campo ";
    }
  },
};
