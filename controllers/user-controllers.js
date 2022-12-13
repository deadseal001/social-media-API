const { Thought, User } = require("../models");

const userController ={
    //get all user information
    getAllUser(req, res){
        User.find({})//populate thoughts info
        .sort({createdAt:-1})
        .then(dbUserdata=>res.json(dbUserdata))
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        })
    },

    // create user
    createUser({body},res){
        User.create()
    }

    //get user by Id
    getUserById({params},res){
        User.findById({_id: praams.userId})
        .populate() //populate thoughts and count the number of thoughts
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





}


module.exports=userController;