import { CircleX, SquareX } from "lucide-react";
import React from "react";

export default function BookingSummaryModal({ data, setSummaryModal, handleConfirmBooking, bookingData, guest }) {

  return (
    <dialog id="my_modal_1" className="modal modal-open">
      <div className="modal-box text-black">
        <div>
          <div className="flex justify-between">
            <h3 className="font-bold text-xl mb-4 text-center">
              Booking Summary
            </h3>
            <div>
              <form method="dialog">
                <span className="cursor-pointer" onClick={() => setSummaryModal(false)}><SquareX /></span>

              </form>
            </div>
          </div>
          <ul className="text-sm space-y-2">
            <li>
              <strong>Hotel name:</strong> {data?.name}
            </li>
            <li>
              <strong>Check-in:</strong> {bookingData?.checkInDate}
            </li>
            <li>
              <strong>Check-out:</strong> {bookingData?.checkOutDate}
            </li>
            <li>
              <strong>Guests:</strong> {guest}
            </li>
            <li>
              <strong>Price/night:</strong> ${data?.pricePerNight}
            </li>
            {/* <li>
              <strong>Total:</strong> $500
            </li> */}
          </ul>
          {/* Confirm button */}
          <button
            onClick={handleConfirmBooking}
            className="w-full mt-4 cursor-pointer bg-Primary  text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform"
          >
            Confirm Booking
          </button>
        </div>


      </div>
    </dialog>
  );
}
