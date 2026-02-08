"use client";

import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { Countdown } from "@/components/sections/Countdown";
import { OrderOfService } from "@/components/sections/OrderOfService";
import { Biography } from "@/components/sections/Biography";
import { PhotoGallery } from "@/components/sections/PhotoGallery";
import { TributeForm } from "@/components/sections/TributeForm";
import { TributeWall } from "@/components/sections/TributeWall";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { DirectionsModal } from "@/components/modals/DirectionsModal";
import { LivestreamModal } from "@/components/modals/LivestreamModal";

export default function Home() {
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [livestreamOpen, setLivestreamOpen] = useState(false);

  return (
    <main>
      <Hero />
      <Navbar
        onDirectionsClick={() => setDirectionsOpen(true)}
        onLivestreamClick={() => setLivestreamOpen(true)}
      />
      <Countdown />
      <SectionDivider />
      <OrderOfService />
      <SectionDivider />
      <Biography />
      <SectionDivider />
      <PhotoGallery />
      <SectionDivider />
      <TributeForm />
      <TributeWall />
      <SectionDivider variant="default" />
      <Footer />
      <DirectionsModal
        isOpen={directionsOpen}
        onClose={() => setDirectionsOpen(false)}
      />
      <LivestreamModal
        isOpen={livestreamOpen}
        onClose={() => setLivestreamOpen(false)}
      />
    </main>
  );
}
