import { CircleX } from "lucide-react";
import React from "react";

export default function BookingSummaryModal({data, user, setOpenModal}) {
  console.log(data);
  return (
    <dialog id="my_modal_1" className="modal modal-open">
      <div className="modal-box text-black">
        {" "}
        {/* text-black যুক্ত করা হলো */}
        <div>
          <h3 className="font-bold text-xl mb-4 text-center">
            Booking Summary
          </h3>
          <ul className="text-sm space-y-2 hidden">
            <li>
              <strong>Room:</strong> {data?.name}
            </li>
            <li>
              <strong>Name:</strong> {user?.displayName}
            </li>
            <li>
              <strong>Email:</strong> {user?.email}
            </li>
            {/* <li>
              <strong>Guests:</strong> {numberOfGuests}
            </li>
            <li>
              <strong>Check-in:</strong> {checkInDate}
            </li>
            <li>
              <strong>Check-out:</strong> {checkOutDate}
            </li> */}
            <li>
              <strong>Price/night:</strong> ${data?.pricePerNight}
            </li>
            {/* <li>
                          <strong>Total:</strong> ${bookingSummary.totalCost}
                        </li> */}
          </ul>
          <button
            //onClick={handleConfirmBooking}
            className="w-full mt-4 cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Confirm Booking
          </button>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={() => setOpenModal(false)} className="btn">
              <CircleX />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
