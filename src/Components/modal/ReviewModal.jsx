import { Star } from "lucide-react";
import React from "react";
import { MdRateReview } from "react-icons/md";

export default function ReviewModal({handleSubmitReview, user, setTextReview}) {
  return (
    <dialog id="my_modal_1" className="modal modal-open">
      <div className="modal-box">
        <h1 className="text-lg font-medium mb-3">{user?.displayName}</h1>
        <div>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label
                htmlFor="review"
                className="block text-sm font-semibold mb-2"
              >
                <MdRateReview size={16} className="inline-block mr-2" /> Write a
                Review
              </label>
              <textarea
                id="review"
                rows="4"
                placeholder="Write your review here..."
                className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none ring-2 ring-blue-200 transition-colors duration-200"
                required
                onChange={(e) => setTextReview(e.target.value)}
              ></textarea>
            </div>

            {/* star rating */}
            {/* <div className="flex space-x-2 text-yellow-400 text-3xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition transform hover:scale-110"
                >
                  <Star
                    fill={(hovered || rating) >= star ? "#facc15" : "none"}
                    stroke="#facc15"
                  />
                </button>
              ))}
            </div> */}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Submit Review
            </button>
          </form>
        </div>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            {/* <button onClick={() => setReviewModal(false)} className="btn">
              Close
            </button> */}
          </form>
        </div>
      </div>
    </dialog>
  );
}
