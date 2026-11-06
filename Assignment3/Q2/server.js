
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
require('dotenv').config();

const app = express();


const redis = new Redis({
    host: process.env.VALKEY_HOST,
    port: Number(process.env.VALKEY_PORT)
});

redis.on('connect', () => {
    console.log('Valkey connected');
});

redis.on('error', (err) => {
    console.log('Valkey error:', err.message);
});
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected');

        await Student.findByIdAndUpdate(
            '671000000000000000000001',
            {
                $setOnInsert: {
                    name: 'Navya',
                    age: 20,
                    course: 'CSE'
                }
            },
            { upsert: true, new: true }
        );

        console.log(
            'Sample Student ID: 671000000000000000000001'
        );
    })
    .catch(err => console.log('MongoDB error:', err.message));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String
});

const Student = mongoose.model('Student', studentSchema);
app.get('/students/:id', async (req, res) => {
    const start = Date.now();

    try {
        const id = req.params.id;
        const cachedStudent = await redis.get(`student:${id}`);

        if (cachedStudent) {
            console.log('Cache HIT');

            return res.json({
                source: 'Valkey Cache',
                responseTime: `${Date.now() - start} ms`,
                student: JSON.parse(cachedStudent)
            });
        }

        console.log('Cache MISS');
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
        await redis.set(
            `student:${id}`,
            JSON.stringify(student),
            'EX',
            60
        );

        res.json({
            source: 'MongoDB',
            responseTime: `${Date.now() - start} ms`,
            student: student
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
