
const express = require('express');

const app = express();

const students = [
    { id: 1, name: 'Navya', course: 'CSE' },
    { id: 2, name: 'Rahul', course: 'ECE' },
    { id: 3, name: 'Priya', course: 'IT' }
];

// Get all students
app.get('/students', (req, res) => {
    res.json(students);
});

// Get student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(
        s => s.id == req.params.id
    );

    if (!student) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

    res.json(student);
});

app.listen(4001, () => {
    console.log('Student Service running on port 4001');
});
