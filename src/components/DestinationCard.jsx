import { ArrowRight, Calendar, MapPin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DestinationCard = ({ destination }) => {
  const { destinationName, country, category, price, departureDate, imageUrl } =
    destination;

  return (
    <div className="max-w-70 mt-6">
      {/* Image Section */}
      <div className="relative h-47.5 overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover"
          unoptimized
        />
        {category && (
          <span className="absolute top-2.5 left-2.5 bg-[#0F6E56] text-[#9FE1CB] text-xs font-medium px-2.5 py-1 rounded-full uppercase">
            {category}
          </span>
        )}
      </div>

      {/* Body Section */}
      <div className="px-4 pt-3.5 pb-4">
        {/* Country */}
        <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
          <MapPin className="w-3.5 h-3.5" />
          {country}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {destinationName}
        </h3>

        {/* Duration + Price Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-[12.5px]">
            <Calendar className="w-3.5 h-3.5" />
            {departureDate}
          </div>
          <div className="text-right">
            <span className="text-xl font-semibold text-[#0F6E56]">
              ${price}
            </span>
            <span className="text-xs text-gray-400 font-normal">/Person</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-2.5" />

        {/* Book Now */}
        <Link
          href="/booking"
          className="flex items-center gap-1.5 text-[#0F6E56] text-sm font-semibold group"
        >
          BOOK NOW
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
