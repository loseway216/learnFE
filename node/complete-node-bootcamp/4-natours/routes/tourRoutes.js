const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
} = require('../controllers/tourController');

const router = express.Router();

// 处理参数的中间件
// router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour); //post(checkBody, createTour)链式调用middleware，在createTour之前checkBody

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
