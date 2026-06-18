const router = require('express').Router();
const auth = require('../middleware/auth');
const Task = require('../models/task.model');

router.use(auth);   // EVERY route below requires a valid token

// GET /tasks  → this user's tasks, newest first
router.get('/', async (req, res, next) => {
  try { res.json(await Task.find({ owner: req.userId }).sort({ createdAt: -1 })); }
  catch (e) { next(e); }
});

// POST /tasks
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const task = await Task.create({ title, description, owner: req.userId });
    res.status(201).json(task);
  } catch (e) { next(e); }
});

// PATCH /tasks/:id  → update or toggle done (only if it belongs to the user)
router.patch('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId }, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json(task);
  } catch (e) { next(e); }
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const removed = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!removed) return res.status(404).json({ message: 'Not found' });
    res.json({ deleted: true });
  } catch (e) { next(e); }
});

module.exports = router;
