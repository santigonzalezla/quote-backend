import User from "../model/user.js";
import bcrypt from "bcryptjs";

const getAllUsers = async (req, res, next) =>
{
    try
    {
        const users = await User.find();
        res.status(201).json(users);
    }
    catch (e)
    {
        next(e);
    }
}

const getUser = async (req, res, next) =>
{
    try
    {
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
    }
    catch (e)
    {
        next(e);
    }
}

const updateUser = async (req, res, next) =>
{
    try
    {
        const updateUser = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );
        res.status(201).json(updateUser);
    }
    catch (e)
    {
        next(e);
    }
}

const deleteUser = async (req, res, next) =>
{
    try
    {
        await User.findByIdAndDelete(req.params.id);
        res.status(201).json("Usuario borrado correctamente");
    }
    catch (e)
    {
        next(e);
    }
}

export {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}