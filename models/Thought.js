const { Schema, model,Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reactionsSchema = new Schema(
    {
        reactionId:{
            type:Schema.Types.ObjectId,
            default:()=> new Types.ObjectId()
        },
        reactionBody: {
            type:String,
            required:true,
            trim:true,
            maxlength:280,
        },
        username: {
            type: String,
            required:true,
            trim:true,
        },
        userId: {
            type: String,
            required:true,
            trim:true,
        },
        createdAt: {
            type: Date,
            default:Date.now,
            get: createdAtVal=> dateFormat(createdAtVal),
        }
    }
)


const thoughtSchema= new Schema(
    {
        thoughtText:{
            type:String,
            required: true,
            trim:true,
            maxlength: 280,
        },
        createdAt: {
            type:Date,
            default:Date.now,
            get: createdAtVal=> dateFormat(createdAtVal)
        },
        username:{
            type:String,
            required:true,
            trim: true,
        },
        reactions: [reactionsSchema],
    },
    {
        toJSON:{
            getters: true,
        },
        id:false,
    }
)

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports=Thought;