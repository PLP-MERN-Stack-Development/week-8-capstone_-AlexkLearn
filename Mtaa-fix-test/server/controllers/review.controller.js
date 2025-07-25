import Review from '../models/Review.js';
import Provider from '../models/Provider.js';

export const leaveReview = async (req, res) => {
  try {
    const { providerId, content } = req.body;

    const review = await Review.create({
      author: req.user.id,
      provider: providerId,
      content
    });

    await Provider.findByIdAndUpdate(providerId, { $push: { reviews: review._id } });

    res.status(201).json(review);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'You have already reviewed this provider' });
    }
    res.status(500).json({ message: 'Failed to post review' });
  }
};

export const updateReview = async (req, res) => {
  try {
    const updated = await Review.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      { content: req.body.content },
      { new: true }
    );
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: 'Could not update review' });
  }
};

export const replyToReview = async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(req.params.id, { reply: req.body.reply }, { new: true });
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ message: 'Reply failed' });
  }
};

export const reportReview = async (req, res) => {
  try {
    const flagged = await Review.findByIdAndUpdate(req.params.id, { reported: true }, { new: true });
    res.status(200).json(flagged);
  } catch {
    res.status(500).json({ message: 'Reporting failed' });
  }
};