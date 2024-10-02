import React from "react";
import { Star, User } from "lucide-react";
import { Review } from "./Types";

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-4">
        {review.userDetails.imageUrl ? (
          <img
            src={review.userDetails.imageUrl}
            alt={review.userDetails.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="text-gray-400" size={24} />
        )}
      </div>
      <div>
        <h4 className="font-semibold text-lg text-gray-800">
          {review.userDetails.name}
        </h4>
        <p className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </p>
      </div>
    </div>
    <div className="flex items-center mb-3">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < review.rating
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-600">
        {review.rating} out of 5
      </span>
    </div>
    <p className="text-gray-700 leading-relaxed">{review.feedback}</p>
  </div>
);

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="bg-gray-50 px-8 py-12">
      <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        What Our Customers Say
      </h3>
      <div className="grid gap-8 ">
        {reviews.map((review, index) => (
          <ReviewItem key={review._id || index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
