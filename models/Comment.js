const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema ({
    // set custom id to avoid confusion with parent comment_id
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String
    },
    writtenBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    }
});

const CommentSchema = new Schema ({
    writtenBy: {
        type: String
    },
    commentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [
        replySchema
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// get total count of replies on retrieval 
CommentSchema.virtual('replyCount').get(function(){
    return this.replies.length;
  });

const Comment = model('Comment', CommentSchema);

module.exports = Comment;