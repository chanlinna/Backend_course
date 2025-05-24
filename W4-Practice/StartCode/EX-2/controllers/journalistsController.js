import { journalists, articles } from "../models/data.js";

// list all journalists 
export const listAllJournalists = (req, res) => {
    res.json(journalists);
};

//get single journalist
export const getJournalist = (req, res) => {
    const journalistId = parseInt(req.params.id);
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

//delete journalist
export const deleteJournalistById = (req, res) => {
    const journalistId = parseInt(req.params.id);
    const index = journalists.findIndex( j => j.id === journalistId);
    if(index === -1) {
        return res.status(404).json({ error: 'Journalist not found' });
    }

    journalists.splice(index, 1);

    res.status(204).send();
};

// get Article by specific journalist 
export const getArticlesByJournalist = (req, res) => {
    const journalistId = parseInt(req.params.id);

    //check if journalistId exists
    const journalist = journalists.some(j => j.id === journalistId);
    if(!journalist) {
        return res.status(404).json({ error: 'Journalist not found' });
    }

    const journalistArticles = articles.filter(a => a.journalistId === journalistId);

    // if no articles
    if(journalistArticles.length === 0) {
        return res.status(404).json({ error: 'No articles found for this journalist' });
    }
    
    res.json(journalistArticles);
};

