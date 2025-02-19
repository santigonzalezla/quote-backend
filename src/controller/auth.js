import User from "../model/user.js";
import bcrypt from "bcryptjs";
import createError from "../utils/error.js";
import jwt from "jsonwebtoken";

const login = async (req, res, next) =>
{
    try
    {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "usuario no encontrado!."));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(401, "usuario y/o contraseña incorrectos!"));

        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY);

        const { password, isAdmin, ...info } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(201).json({details: {...info}, isAdmin});
    }
    catch (e)
    {
        next(e);
    }
}

const register = async (req, res, next) =>
{
    try
    {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
        });

        await newUser.save();
        res.status(201).json("Usuario creado exitosamente.");
    }
    catch (e)
    {
        next(e);
    }
}

export {
    login,
    register
};