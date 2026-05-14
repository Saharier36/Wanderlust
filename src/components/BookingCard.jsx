'use client';
import { ArrowRight, Check } from "@gravity-ui/icons";
import { Button, DateField, Label, Separator } from "@heroui/react";
import React from "react";

const BookingCard = ({ destination }) => {
  const { price } = destination;

  const perks = [
    "Free cancellation up to 7 days",
    "Travel insurance included",
    "24/7 customer support",
  ];

  return (
    <div className="border border-gray-100 shadow p-5 sticky top-4">
      <p className="text-xs text-gray-400 mb-0.5">Starting from</p>
      <p className="text-3xl font-bold text-cyan-600">${price}</p>
      <p className="text-xs text-gray-400 mb-3">per person</p>

      <Separator />

      <p className="text-xs text-gray-400 mt-3 mb-1.5">Departure date</p>
      <DateField className="w-full mb-2" name="date">
        <Label>Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>

      <Button
        className="w-full bg-cyan-600 text-white font-semibold rounded-none"
        size="md"
      >
        Book Now <ArrowRight className="w-4 h-4" />
      </Button>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2.5">
        {perks.map((perk, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-xs text-gray-400"
          >
            <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
            {perk}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCard;
