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

// /api/thoughts/<userId>/<thougtId>     //route should have two ids
router
  .route('/:userId/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought)
  .post(addReaction);

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId')
  .put(updateReaction)
  .delete(removeReaction);

module.exports = router;
