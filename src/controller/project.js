import Project from "../model/project.js";
import User from "../model/user.js";

const getAllProjects = async (req, res, next) =>
{
    try
    {
        const projects = await Project.find();
        res.status(201).json(projects);
    }
    catch (e)
    {
        next(e);
    }
}

const getProject = async (req, res, next) =>
{
    try
    {
        const project = await Project.findById(req.params.id);
        res.status(201).json(project);
    }
    catch (e)
    {
        next(e);
    }
}

const createProject = async (req, res, next) =>
{
    const userId = req.params.userid;

    try
    {
        const newProject = new Project(req.body);
        const saveProject = await newProject.save();

        try
        {
            await User.findByIdAndUpdate(userId, {
               $push: { projects: saveProject._id }
            });
        }
        catch (e)
        {
            next(e);
        }
        res.status(201).json(saveProject);
    }
    catch (e)
    {
        next(e);
    }
}

const updateProject = async (req, res, next) =>
{
    try
    {
        const updateProject = await Project.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );
        res.status(201).json(updateProject);
    }
    catch (e)
    {
        next(e);
    }
}

const deleteProject = async (req, res, next) =>
{
    const userId = req.params.userid;

    try
    {
        await Project.findByIdAndDelete(req.params.id);
        try
        {
            await User.findByIdAndUpdate(userId, {
                $pull: { projects: req.params.id}
            });
        }
        catch (e)
        {
            next(e);
        }
        res.status(201).json("Proyecto borrado correctamente");
    }
    catch (e)
    {
        next(e);
    }
}

export {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}