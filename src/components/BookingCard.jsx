"use client";
import { authClient } from "@/lib/auth-client";
import { ArrowRight } from "@gravity-ui/icons";
import { Button, DateField, Label, Separator } from "@heroui/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const BookingCard = ({ destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [departureDate, setDepartureDate] = useState(null);

  const { _id, price, destinationName, imageUrl, country } = destination;

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: _id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDate: new Date(departureDate),
    };

    const {data: tokenData} = await authClient.token()

    const res = await fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    toast.success("You booked successfully");
  };

  return (
    <div className="border border-gray-100 shadow p-5 sticky top-4">
      <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
      <p className="text-3xl font-bold text-cyan-600">${price}</p>
      <p className="text-xs text-gray-400 mb-3">per person</p>

      <Separator />

      <p className="text-xs text-gray-400 mt-3 mb-1.5">Departure date</p>
      <DateField
        onChange={setDepartureDate}
        className="w-full mb-2"
        name="date"
      >
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>

      <Button
        onClick={handleBooking}
        className="w-full bg-cyan-600 text-white font-semibold rounded-none"
        size="md"
      >
        Book Now <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default BookingCard;
