"use client";

import { Modal } from "./Modal";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { MapPin, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";

export interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DirectionsModal({ isOpen, onClose }: DirectionsModalProps) {
  const fullAddress = `${siteConfig.venue.name}, ${siteConfig.venue.address}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Service Location">
      <div className="space-y-6">
        {/* Venue Info */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gold" />
            <div>
              <h3 className="font-serif text-xl font-semibold text-text">
                {siteConfig.venue.name}
              </h3>
              <p className="mt-1 font-sans text-base text-text-muted">
                {siteConfig.venue.address}
              </p>
              <p className="mt-2 font-sans text-sm text-text-light">
                {siteConfig.serviceDateDisplay}
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="overflow-hidden rounded-lg border border-border">
          <iframe
            src={siteConfig.venue.mapsEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Service location map"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="primary"
            onClick={() => {
              window.open(siteConfig.venue.mapsUrl, "_blank", "noopener,noreferrer");
            }}
            className="flex-1 gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Get Directions
          </Button>
          <CopyButton text={fullAddress} variant="outline" className="flex-1" />
        </div>
      </div>
    </Modal>
  );
}
