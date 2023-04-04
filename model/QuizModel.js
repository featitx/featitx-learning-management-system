const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    teacherType: {
        type: String,
        default: "BBA"
    },
    quizDesc: {
        type: String,
        default: "No Desc"
    },
    questions: [{
        text: String,
        options: [String],
        answer: String
    }]
}, { timestamps: true });

const QuizModel = mongoose.model('Quiz', quizSchema);

module.exports = QuizModel;
