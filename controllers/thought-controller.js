const { Thought, User } = require("../models");

const thoughtController = {
    //get all thoughts
    getAllThoughts(req,res){
        Thought.find({})
            .populate(
                {
                    path:'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .sort({createdAt:-1})
            .then(dbThoughtdata=>res.json(dbThoughtdata))
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    //add thought
    addThought({params, body},res){
        Thought.create(body)
            .then(({_id})=>{
                return User.findOneAndUpdate(
                    {_id: params.userId},
                    {$push:{thoughts:_id}},
                    {new:true}
                );
            })
            .then(dbThoughtdata=>{
                if (!dbThoughtdata){
                    res.status(404).json({message: 'No user found with this ID!'});
                    return;
                }
                console.log('thoughts added');
                res.json(dbThoughtdata);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get single thoughtn by thoughtId
    getSingleThought({params}, res){
        Thought.findById({_id:params.thoughtId})
            .populate(
                {
                    path:'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .then((dbThoughtdata)=>{
                if(!dbThoughtdata){
                    return res.status(404).json({message: "No thought found with this ID!"});
                }
                res.json(dbThoughtdata);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update thought
    updateThought({params,body},res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$set:body},
            {
                new:true, 
                runValidators:true
            }
        )
            .then(dbThoughtdata=>{
                if(!dbThoughtdata){
                    res.status(404).json({message: "No thought found with this ID!"});
                }
                res.json(dbThoughtdata);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete thought
    removeThought({params},res){
        Thought.findOneAndRemove({_id:params.thoughtId})
            .then((deletedThought)=>{
                if(!deletedThought){
                    return res.status(404).json({message:"No thought with this Id!"})
                }
                return User.findByIdAndUpdate(
                    {_id:params.userId},
                    {$pull:{thoughts:params.thoughtId}},
                    {new: true}
                );
            })
            .then(dbThoughtdata=>{
                if(!dbThoughtdata){
                    res.status(404).json({message: 'No thought found with this ID!'});
                    return;
                }
                console.log('Thoughts removed successfully!');
                res.json(dbThoughtdata);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    // add reaction
    addReaction({params,body},res) {
        Thought.findOneAndUpdate({_id:params.thoughtId},{$push:{reactions:body}},{new:true})
            .then(dbThoughtdata=>{
                if (!dbThoughtdata){
                    res.status(404).json({message: "No thought found with this ID! Can't add reaction."});
                    return;
                }
                console.log('Thoughts added successfully!');
                res.json(dbThoughtdata);
            })    
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    //update reaction
    updateReaction({params, body},res){
        Thought.findOneAndUpdate({_id:params.thoughtId},{$set:{reactions:body}},{new:true})
            .then(dbThoughtdata=>{
                if (!dbThoughtdata){
                    res.status(404).json({message: "No thought found with this ID! Can't add reaction."});
                    return;
                }
                res.json(dbThoughtdata);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            })
    },

    //remove reaction
    removeReaction({params},res){
        Thought.findOneAndUpdate({_id:params.thoughtId},{$pull:{reactions:{reactionId:params.reactionId}}},{new:true})
            .then (dbThoughtdata=>res.json(dbThoughtdata))
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            })
    }
}

module.exports = thoughtController;//double check