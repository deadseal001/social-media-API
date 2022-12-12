const { Thought, User } = require("../models");
const { findById } = require("../models/User");// what this one is doing here?

const thoughtController = {
    //get all thoughts
    getAllThoughts(req,res){
        Thought.find({})
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
    getSinlgeThought(req, res){
        Thought.findById({_id:req.params.thoughtId})
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
            {_id: params.thoughtId},body,{
                new:true, 
                runValidators:true
        })
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
    removeThought({params,body},res){
        Thought.findOneAndRemove({_id:params.thoughtId})
            .then(()=>{
                return User.findByIdAndUpdate(
                    {_id:params.userId},
                    {$pull:{thought:_id}},
                    {new: true}
                );
            })
            .then(dbThoughtdata=>{
                if(!dbThoughtdata){
                    res.status(404).json({message: 'No user found with this ID!'});
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
    //addReaction
}

module.exports = router;