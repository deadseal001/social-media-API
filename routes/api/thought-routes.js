const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  updateReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router.route("/")
  .get(getAllThoughts);

// /api/thoughts/<userId>
router
  .route('/:userId')
  .post(addThought);  

// /api/thoughts/<userId>/<thougtId>     
router
  .route('/:userId/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought)
  .post(addReaction);

// /api/thoughts/<thoughtId>/reactions/<reactionId>
router.route('/:thoughtId/reactions/:reactionId')
  .put(updateReaction)
  .delete(removeReaction);

module.exports = router;
