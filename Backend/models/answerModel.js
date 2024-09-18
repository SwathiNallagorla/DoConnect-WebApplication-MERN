const mongoose = require("mongoose");

const answerSchema=new mongoose.Schema({
    answertext:{
        type:String,
        required:true
    },
    isapproved:{
        type:Boolean,
        default:false
    },
    questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Questions', 
        required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users',
        },
    ]
})

const Answers=mongoose.model('Answers',answerSchema);

module.exports=Answers;