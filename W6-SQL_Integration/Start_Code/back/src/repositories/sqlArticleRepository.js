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
        "select a.*, j.name as journalistName from articles a join journalists j on a.journalistId = j.id;");
        return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await pool.query(
        "select a.*,j.id as journalistId, j.name as journalistName from articles a join journalists j on a.journalistId = j.id where a.id = ?;", [id]
    );
    return rows[0];
}

// Create a new article
export async function createArticle(article) {
    // TODO
    const { title, content, category, journalistId } = article;
    const [result] = await pool.query(
        "insert into articles (title, content, category, journalistId) values (?, ?, ?, ?)",
        [title, content, category, journalistId]
    );
    const id = result.insertId;
    return getArticleById(id);
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const { title, content, category, journalistId } = updatedData;
    await pool.query(
        "update articles set title = ?, content = ?, category = ?, journalistId = ? where id = ?",
        [title, content, category, journalistId, id]
    );
    return getArticleById(id);
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
        "select a.*, j.name as journalistName from articles a join journalists j on a.journalistId = j.id where a.journalistId = ?", [journalistId]
    );
    return rows;
}
