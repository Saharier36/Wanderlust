import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import Image from "next/image";
import { Card, Button } from "@heroui/react";
import { Eye, Calendar, MapPin, Tag } from "@gravity-ui/icons";
import BookingCancel from "@/components/BookingCancel";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const res = await fetch(`http://localhost:5000/booking/${user?.id}`);
  const bookings = await res.json();

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-medium">My Bookings</h1>
      <p className="text-sm text-[#6C696D] mt-1 mb-4">
        Manage and view your upcoming travel plans
      </p>

      <div className="flex flex-col gap-4">
        {bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
            <MapPin width={40} height={40} className="mb-3 opacity-40" />
            <h2 className="text-lg font-medium text-gray-500">
              No bookings yet
            </h2>
            <p className="text-sm mt-1">
              You haven&apos;t booked any trips. Start exploring destinations!
            </p>
          </div>
        )}

        {bookings.map((booking) => (
          <Card
            key={booking._id}
            className="flex flex-row rounded-none border border-gray-100"
          >
            {/* Image */}
            <Image
              src={booking.imageUrl}
              alt={booking.destinationName}
              width={220}
              height={160}
            />

            {/* Body */}
            <div className="flex flex-col justify-between flex-1 p-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">{booking.destinationName}</h2>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar width={15} height={15} />
                    Departure:{" "}
                    {new Date(booking.departureDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin width={15} height={15} />
                    {booking.country}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag width={15} height={15} />
                    Booking ID: {booking._id}
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xl font-medium text-[#0088aa]">
                  ${booking.price}
                </span>
                <div className="flex gap-2">
                  <BookingCancel bookingId={booking._id} />
                  <Button size="sm" className="bg-cyan-600 rounded-none">
                    <Eye width={14} height={14} />
                    View
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
