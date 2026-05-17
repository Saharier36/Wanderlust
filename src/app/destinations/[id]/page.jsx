import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EditModal } from "@/components/EditModal";
import { Chip } from "@heroui/react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  StarFill,
} from "@gravity-ui/icons";
import { DeleteAlert } from "@/components/DeleteAlert";
import BookingCard from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DestinationsDetails = async ({ params }) => {
  const { id } = await params;

  const {token} = await auth.api.getToken({
    headers: await headers()
  })


  const res = await fetch(`http://localhost:5000/destinations/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const destination = await res.json();

  const { destinationName, country, imageUrl, description, duration } =
    destination;

  const nights = duration ? Number(duration) - 1 : null;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between py-4">
        <Link
          href="/destinations"
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Destinations
        </Link>

        <div className="flex gap-2">
          <EditModal destination={destination} />
          <DeleteAlert destination={destination} />
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-70 overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] md:gap-50 mt-6 items-start">
        {/* Left Column */}
        <div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400 mb-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {country}
          </div>

          <h1 className="text-3xl font-semibold mb-2.5">{destinationName}</h1>

          <div className="flex items-center gap-3 mb-5">
            <Chip color="warning" size="sm">
              <Chip.Label className="flex items-center gap-1">
                <StarFill className="w-3 h-3" /> 4.9
              </Chip.Label>
            </Chip>
            <span className="text-sm text-gray-400">(234 reviews)</span>
            {duration && (
              <Chip size="sm">
                <Chip.Label className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {duration} Days / {nights} Nights
                </Chip.Label>
              </Chip>
            )}
          </div>

          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Booking Card */}
        <BookingCard destination={destination} />
      </div>
    </div>
  );
};

export default DestinationsDetails;
