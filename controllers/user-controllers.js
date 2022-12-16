const { Thought, User } = require("../models");

const userController ={
    //get all user information
    getAllUser(req, res){
        User.find({})
        .populate({
            path:'thoughts',
            select:'-__v'
        })
        .select('-__v')
        .sort({_id:-1})
        .then(dbUserdata=>res.json(dbUserdata))
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        })
    },

    // create user
    createUser({body},res){
        User.create(body)
            .then(dbUserdata=>res.json(dbUserdata))
            .catch(err=>{
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get user by Id
    getUserById({params},res){
        User.findById({_id: params.userId})
        .populate({
            path:'thoughts',
            select:'-__v'
        }) 
        .select('-__v')
        .then(dbUserdata=>{
            if(!dbUserdata){
                return res.status(404).json({message: "No user found with this ID!"});
            }
            res.json(dbUserdata);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    },

    //update user
    updateUser({params,body},res){
        User.findByIdAndUpdate(
            {_id:params.userId},
            {
                $set: body
            },
            {
                new:true,
                runvalidatros:true,
            }
        )
        .then(dbUserdata=>{
            if (!dbUserdata){
                return res.status(404).json({message: "No user found with this Id!"})
            }
            res.json(dbUserdata)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });

    },


    //deleteUser  add function to also delete thoughts of ths user
    deleteUser({params},res){
        User.findOneAndDelete({_id: params.userId})
            .then(dbUserdata=>{
                if(!dbUserdata){
                    return res.status(404).json({message: "No user with this id!"});
                }
                return Thought.deleteMany({username:dbUserdata.username},{new:true}) 
            })
            .then(result=> res.json(result))
            .catch(err=>{
                console.log(err);
                res.json(err)
            })
    },

    // add friend
    addFriend({params},res) {
        User.findOneAndUpdate(
            {_id:params.userId},
            {$addToSet:{friends:params.friendId}},
            {new:true}
        )
        .then(dbUserdata=>{
            if (!dbUserdata){
                return res.stasus(404).json({message:'No user found with this Id!'})
            }
            res.json(dbUserdata);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        })
    },

    //remove a friend
    removeFriend({params},res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull:{friends:params.friendId}},
            {new:true}
        )
        .then(dbUserdata=>{
            if (!dbUserdata){
                return res.stasus(404).json({message:'No user found with this Id!'})
            }
            res.json(dbUserdata);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    }


}


module.exports=userController;