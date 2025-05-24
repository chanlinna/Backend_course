import journalists from "../models/data.js";

// list all journalists 
export const listAllJournalists = (req, res) => {
    res.json(journalists);
};

//get single journalist
export const getJournalist = (req, res) => {
    const journalistId = parseInt(re1.params.id);
    const journalist = journalists.find( j => j.id === journalistId);
    if (!journalist) {
        return res.status(404).json({ error: 'Journalist not found' });
    }
    res.json(journalist);
};

//create new journalist
export const createJournalist = (req, res) => {
    const { name, email } = req.body;
    if(!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newJournalist = {
        id: journalists.length + 1,
        name,
        email
    };
    journalists.push(newJournalist);
    res.status(201).json(newJournalist);
};

//update journalist
export const updateJournalistById = (req, res) => {
    const journalistId = parseInt(req.params.id);
    const { name , email} = req.body;

    const journalist = journalists.find( j => j.id === journalistId);
    if(!journalist) {
        return res.status(404).json({ error: 'Journalist not found' });
    }

    if (name) journalist.name = name;
    if (email) journalist.email = email;

    res.json(journalist);

};

