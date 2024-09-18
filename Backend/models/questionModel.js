const mongoose=require('mongoose');

const questionSchema = new mongoose.Schema({
    questiontext:{
        type: String,
        required: true,
        minLength:[10,'Question must be minimum of 10 characters']
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        minLength:[10,'Description must be minimum of 10 characters']
    },
    category:{
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'resolved'],
        default: 'pending',
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: true
    }
})

const Questions=mongoose.model('Questions',questionSchema);

module.exports=Questions;