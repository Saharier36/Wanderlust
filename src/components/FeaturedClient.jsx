// src/components/FeaturedClient.jsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button, Chip } from "@heroui/react";
import { ArrowRight, ArrowLeft, MapPin, ArrowUpRight } from "@gravity-ui/icons";
import Link from "next/link";
import Image from "next/image";

const FeaturedClient = ({ destinations }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <section className="py-12 px-4 md:px-8 container mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold">Featured Destinations</h2>
          <p className="text-gray-500 mt-1 text-sm">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link href="/destinations">
          <Button
            variant="bordered"
            className="uppercase border border-cyan-500 text-cyan-500 rounded-none hidden md:flex"
          >
            <ArrowRight />
            All Destinations
          </Button>
        </Link>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {destinations?.map((dest, index) => (
            <div
              key={dest._id || index}
              className="flex-none w-[320px] md:w-90"
            >
              <div className="overflow-hidden group cursor-pointer">
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={
                      Array.isArray(dest.imageUrl)
                        ? dest.imageUrl[0]
                        : dest.imageUrl
                    }
                    alt={dest.destinationName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 320px, 360px"
                  />

                  {/* Category Badge */}
                  <Chip
                    className="absolute top-3 right-3 bg-black/60 text-white text-xs font-medium z-10"
                    size="sm"
                  >
                    {dest.category}
                  </Chip>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  {/* Country */}
                  <div className="flex items-center gap-1 text-default-400 text-xs mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.country}</span>
                  </div>

                  {/* Name + Price */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-xl text-foreground leading-tight">
                      {dest.destinationName}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="text-foreground font-bold text-lg">
                        ${Number(dest.price).toLocaleString()}
                      </span>
                      <span className="text-default-400 text-xs">/Person</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1 text-default-400 text-xs mt-1 mb-4">
                    <span>🗓</span>
                    <span>
                      {dest.duration} Days/{Number(dest.duration) - 1} Nights
                    </span>
                  </div>

                  {/* Book Now */}
                  <Link
                    href={`/destinations/${dest._id}`}
                    className="flex items-center gap-1.5 text-cyan-600 text-sm font-semibold underline group"
                  >
                    BOOK NOW
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination + Arrows */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-gray-600 font-medium">
          {currentIndex + 1}/{destinations?.length || 0}
        </span>

        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="bordered"
            onPress={scrollPrev}
            className="border border-gray-600 text-gray-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            isIconOnly
            variant="bordered"
            onPress={scrollNext}
            className="border border-gray-600 text-gray-600"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedClient;
