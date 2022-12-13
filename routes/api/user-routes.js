const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controllers');

// /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/users/:userId
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/user/:userId/
router
  .route('/:userID/friendId')
  .post(addFriend)
  .delete(removeFriend);

  
module.exports = router;