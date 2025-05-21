// server.js
import express from 'express';
import courses from "./course.js";
const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    if (minCredits && maxCredits && parseInt(minCredits) > parseInt(maxCredits)) {
        return res.status(400).json({
            error: "Invalid credit range: minCredits should not be greater than maxCredits."
        });
    }
    
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    let results = courses.filter(course => 
        course.department.toLowerCase() === dept.toLowerCase()
    );

    if (level) {
        results = results.filter(course => course.level.toLowerCase() === level.toLowerCase());
    }

    if (minCredits) {
        results = results.filter(course => course.credits >= parseInt(minCredits));
    }

    if (maxCredits) {
        results = results.filter(course => course.credits <= parseInt(maxCredits));
    }

    if (semester) {
        results = results.filter(course => course.semester.toLowerCase() === semester.toLowerCase());
    }

    if (instructor) {
        results = results.filter(course => 
            course.instructor.toLowerCase().includes(instructor.toLowerCase())
        );
    }

    res.json({
        results,
        meta: {
            total: results.length
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
