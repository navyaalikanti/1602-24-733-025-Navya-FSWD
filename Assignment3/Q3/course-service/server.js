
const express = require('express');

const app = express();

const courses = [
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Information Technology' }
];

// Get all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// Get course by ID
app.get('/courses/:id', (req, res) => {
    const course = courses.find(
        c => c.id == req.params.id
    );

    if (!course) {
        return res.status(404).json({
            message: 'Course not found'
        });
    }

    res.json(course);
});

app.listen(4002, () => {
    console.log('Course Service running on port 4002');
});
