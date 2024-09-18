const Questions = require('../models/questionModel.js');

exports.getAllApprovedQuestions = async (req, res) => {
    try {
        const questions = await Questions.find({ status: 'approved' });
        if (questions.length === 0) {
            return res.status(404).send({ message: 'No questions found' });
        }
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getAllApprovedQuestionsOfUser = async (req, res) => {
    try {
        const questions = await Questions.find({ status: 'approved', userId: req.user.id });
        if (questions.length === 0) {
            return res.status(404).send({ message: 'No questions found' });
        }
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getAllUnApprovedQuestions = async (req, res) => {
    try {
        const questions = await Questions.find({ status: 'pending' });
        if (questions.length === 0) {
            return res.status(404).send({ message: 'No questions found' });
        }
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getQuestionByText = async (req, res) => {
    try {
        const text = req.params.text;
        const questions = await Questions.find({ questiontext: new RegExp(text, 'i'), status: 'approved' });
        if (questions.length === 0) {
            return res.status(404).send({ message: 'No questions found' });
        }
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.createQuestion = async (req, res) => {
    const { questiontext, image, description, category } = req.body;
    try {
        const newquestion = new Questions({
            questiontext: questiontext,
            image: image,
            description: description,
            category: category,
            userId: req.user.id
        });
        await newquestion.save();
        res.status(200).send(newquestion);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.approveQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const prequestion = await Questions.findById(id);
        if (prequestion.status === 'approved') {
            return res.status(200).send('Question already approved');
        }
        if (prequestion.status === 'resolved') {
            return res.status(200).send('Question already resolved');
        }
        const question = await Questions.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
        if (!question) {
            return res.status(404).send({ message: 'No question found' });
        }
        res.send({ message: 'Question Approved..', question });
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.resolveQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await Questions.findByIdAndUpdate(id, { status: 'resolved' }, { new: true });
        if (!question) {
            return res.status(404).send({ message: 'No question found' });
        }
        res.send({ messsage: 'Question Resolved..', question });
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Questions.find();
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getAllQuestionsByUser = async (req, res) => {
    try {
        const questions = await Questions.find({ userId: req.user._id });
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const question = await Questions.findById(req.params.qid);

        if (!question) return res.status(404).send({ message: 'Question not found' });

        if (question.userId.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: 'Not authorized to update this question' });
        }

        const updatedQuestion = await Questions.findByIdAndUpdate(req.params.qid, req.body, { new: true });

        res.send({ message: 'Question updated', updatedQuestion });
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await Questions.findById(id);
        if (!question) {
            return res.status(404).send('Question not found');
        }
        if (question.status !== 'approved') {
            return res.status(405).send('Question not approved');
        }
        res.status(200).send(question);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.getQuestionByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const questions = await Questions.find({
            category: category, // Case-insensitive regex
            status: 'approved'
        });
        if (!questions) {
            return res.status(404).send({ message: 'No questions found' });
        }
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

exports.deleteQuestionById = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await Questions.findByIdAndDelete(id);
        if (!question) {
            return res.status(404).send({ message: 'No question found' });
        }
        res.send({ message: 'Question Deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

