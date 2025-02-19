import Proposal from "../model/proposal.js";
import Project from "../model/project.js";

const getAllProposals = async (req, res, next) =>
{
    try
    {
        const proposals = await Proposal.find();
        res.status(201).json(proposals);
    }
    catch (e)
    {
        next(e);
    }
}

const getProposal = async (req, res, next) =>
{
    try
    {
        const proposal = await Proposal.findById(req.params.id);
        res.status(201).json(proposal);
    }
    catch (e)
    {
        next(e);
    }
}

const createProposal = async (req, res, next) =>
{
    const projectId = req.params.projectid;

    try
    {
        const newProposal = new Proposal(req.body);
        const saveProposal = await newProposal.save();

        try
        {
            await Project.findByIdAndUpdate(projectId, {
                $set: { proposal: saveProposal._id }
            });
        }
        catch (e)
        {
            next(e);
        }
        res.status(201).json(saveProposal);
    }
    catch (e)
    {
        next(e);
    }
}

const updateProposal = async (req, res, next) =>
{
    try
    {
        const updateProposal = await Proposal.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );
        res.status(201).json(updateProposal);
    }
    catch (e)
    {
        next(e);
    }
}

const deleteProposal = async (req, res, next) =>
{
    const projectId = req.params.projectid;

    try
    {
        await Proposal.findByIdAndDelete(req.params.id);
        try
        {
            await Project.findByIdAndUpdate(projectId, {
                $unset: { proposal: 1 }
            });
        }
        catch (e)
        {
            next(e);
        }
        res.status(201).json("Propuesta borrada correctamente");
    }
    catch (e)
    {
        next(e);
    }
}

export {
    getAllProposals,
    getProposal,
    createProposal,
    updateProposal,
    deleteProposal
}