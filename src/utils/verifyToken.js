import jwt from "jsonwebtoken";
import createError from "./error.js";

const verifyToken = (req, res, next) =>
{
    const token = req.cookies.access_token;

    if (!token) return next(createError(401, "Usuario no autenticado!"));

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) =>
    {
       if (err) return next(createError(403, "Token inválido!"));
       req.user = user;
       next();
    });
}

const verifyUser = (req, res, next) =>
{
    verifyToken(req, res, next, () =>
    {
        if (req.user.id === req.params.id || req.user.isAdmin)
        {
            next();
        }
        else
        {
            return next(createError(403, "Este usuario no te pertenece. No estas autorizado!"));
        }
    });
}

const verifyAdmin = (req, res, next) =>
{
    verifyToken(req, res, next, () =>
    {
        if (req.user.isAdmin)
        {
            next();
        }
        else
        {
            return next(createError(403, "No eres Administrador. No estas autorizado!"));
        }
    });
}

export {
    verifyToken,
    verifyUser,
    verifyAdmin
};