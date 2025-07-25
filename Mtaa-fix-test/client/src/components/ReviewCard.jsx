import { formatDate } from "../utils/date.js";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-sm text-gray-800">{review.content}</p>
      <p className="text-xs text-gray-500 mt-1">— {review.author?.name}</p>
      <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
      {review.reply && (
        <div className="mt-2 p-2 bg-gray-100 rounded text-sm text-gray-700">
          <strong>Provider Reply:</strong> {review.reply}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;