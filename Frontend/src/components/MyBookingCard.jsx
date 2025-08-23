import React from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Image from './Image';

const MyBookingCard = ({ booking }) => {
  return (
    <div className="max-sm:max-w-85 overflow-hidden flex gap-3 items-center justify-between p-2 lg:p-8 rounded-2xl my-4 border-2 border-neutral-200/70">
      <div className="flex flex-col lg:flex-row w-full gap-7 justify-between lg:items-start">
        
        <div className="flex flex-col gap-2">
          <Image path={booking.car?.image} alt="car" className="rounded-xl h-42 w-75 lg:h-52 lg:w-85 object-cover"
          />
          <div>
            <h3 className="text-sm lg:text-lg font-semibold">
              {booking.car?.brand} {booking.car?.model}
            </h3>
            <p className="text-xs lg:text-sm text-neutral-400">
              {booking.car?.year} · {booking.car?.category}
            </p>
          </div>
        </div>

        <div className="flex justify-between flex-1">
          <div className="flex flex-col gap-2 items-start justify-between">
            <p className="bg-green-200/50 text-green-600 text-sm lg:text-base p-0.5 px-1 rounded">
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-1">
                <FaCalendarAlt className="text-blue-400/80 text-sm lg:text-base" />
                <div>
                  <p className="text-xs lg:text-lg text-neutral-400">Rental Period</p>
                  <p className="text-xs lg:text-lg font-semibold">
                    {new Date(booking.pickupDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })} 
                    {" - "}
                    {new Date(booking.returnDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-1">
                <FaLocationDot className="text-blue-400/80 text-sm lg:text-base" />
                <div>
                  <p className="text-xs lg:text-lg text-neutral-400">Pickup Location</p>
                  <p className="text-xs lg:text-lg font-semibold">{booking.pickUpLocation}</p>
                </div>
              </div>

              <div className="flex items-start gap-1">
                <FaLocationDot className="text-blue-400/80 text-sm lg:text-base" />
                <div>
                  <p className="text-xs lg:text-lg text-neutral-400">Return Location</p>
                  <p className="text-xs lg:text-lg font-semibold">{booking.returnLocation}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <p className="text-xs lg:text-sm text-neutral-400">Total Price</p>
            <p className="text-lg lg:text-2xl text-blue-600 font-semibold">${booking.price}</p>
            <p className="text-xs lg:text-sm text-neutral-400 max-sm:w-20">
              Booked on{" "}
              {new Date(booking.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;
