import React from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const BookingCardSkeleton = () => {
  return (
    <div className="max-sm:max-w-80 overflow-hidden flex gap-3 items-center justify-between w-full p-2 lg:p-8 rounded-2xl my-4 border-2 border-neutral-200/70">
      <div className="flex flex-col lg:flex-row w-full gap-7 justify-between lg:items-start">
        
        <div className="flex flex-col gap-4">
            <div className="rounded-xl h-42 w-75 lg:h-52 lg:w-85 skeleton_loading"></div>
          <div>
            <p className="h-4 w-30 skeleton_loading"></p>
          </div>
        </div>

        <div className="flex justify-between flex-1">
          <div className="flex flex-col gap-2 items-start justify-between">

            <div className="flex flex-col gap-8">
                <div>
                    <p className="h-7 w-xs skeleton_loading"></p>
                </div>

                <div>
                    <p className="h-7 w-xs skeleton_loading"></p>
                </div>
                <div>
                    <p className="h-7 w-xs skeleton_loading"></p>
                </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <p className="h-4 w-20 skeleton_loading"></p>
            <p className="h-4 w-10 skeleton_loading"></p>
            <p className="h-4 w-40 skeleton_loading"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton;
