//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import { pool } from "../utils/database.js";

// Get all articles
export async function getArticles() {
    // TODO
    const [rows] = await pool.query(
        "select a.*, j.name as 'Journalist' from articles a join journalists j on a.journalistId = j.id;");
        return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await pool.query(
        "select a.*, j.name as ''Journalist' from articles a join journalists j on a.journalistId = j.id where a.id = ?;", [id]
    );
    return rows[0];
}

// Create a new article
export async function createArticle(article) {
    // TODO
    const { title, content, journalist, category } = article;
    const [result] = await pool.query(
        "insert into articles (title, content, journalist, category) values (?, ?, ?, ?)",
        [title, content, journalist, category]
    );
    const id = result.insertId;
    return getArticleById(id);
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const { title, content, journalist, category } = updatedData;
    await pool.query(
        "update articles set title = ?, content = ?, journalist = ?, category = ? where id = ?",
        [title, content, journalist, category, id]
    );

}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    await pool.query(
        "delete from articles where id = ?", [id]
    );  
}

//Fetch all articles written by a specific journalist name 
export async function getArticlesByJournalistId(journalistId) {
    const [rows] = await pool.query(
        "select a.*, j.name as 'Journalist'from articles a join journalists j on a.journalistId = j.id where a.journalistId = ?", [journalistId]
    );
    return rows;
}
