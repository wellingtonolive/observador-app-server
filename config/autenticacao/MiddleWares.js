const passport = require("passport");

module.exports = {
  local: (req, res, next) => {
    passport.authenticate(
      "local",
      { session: false },
      (erro, usuario, info) => {
        if (erro && erro.name === "InvalidArgumentError") {
          return res.status(401).json({ erro: erro.message });
        }

        if (erro) {
          return res.status(500).json({ erro: erro.message });
        }

        if (!usuario) {
          return res.status(401).json();
        }

        req.user = usuario;
        return next();
      }
    )(req, res, next);
  },

  bearer: (req, res, next) => {
    passport.authenticate(
      "bearer",
      { session: false },
      (erro, usuario, info) => {
        if (erro && erro.name === "JsonWebTokenError") {
          return res.status(401).json({ erro: erro.message });
        }

        if (erro && erro.name === "ExpirationError") {
          return res.status(401).json({ erro: erro.message });
        }

        if (erro && erro.name === "TokenExpiredError") {
          res
            .status(401)
            .json({ erro: erro.message, expiradoEm: erro.expiredAt });
        }

        if (!usuario) {
          return res.status(401).json();
        }

        if (erro) {
          return res.status(500).json({ erro: erro.message });
        }

        req.user = usuario;
        return next();
      }
    )(req, res, next);
  },
};
