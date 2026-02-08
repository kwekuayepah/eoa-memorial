"use client";

import { Modal } from "./Modal";
import { Button } from "@/components/ui/Button";
import { Calendar, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/data/site-config";

export interface LivestreamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LivestreamModal({ isOpen, onClose }: LivestreamModalProps) {
  const serviceDate = new Date(siteConfig.serviceDate);
  const hasPassed = serviceDate < new Date();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Watch Service Live">
      <div className="space-y-6">
        {/* Service Info */}
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-gold" />
            <div>
              <p className="font-sans text-base text-text-muted">
                {siteConfig.serviceDateDisplay}
              </p>
              {hasPassed ? (
                <p className="mt-2 font-sans text-sm text-text-light">
                  The service has been held. Watch the recording below.
                </p>
              ) : (
                <p className="mt-2 font-sans text-sm text-text-light">
                  Join us online to pay your respects and watch the memorial
                  service.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Livestream Link */}
        <div className="rounded-lg border border-border bg-bg-alt p-6 text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              window.open(
                siteConfig.livestreamUrl,
                "_blank",
                "noopener,noreferrer"
              );
            }}
            className="gap-2"
          >
            <ExternalLink className="h-5 w-5" />
            {hasPassed ? "Watch Recording" : "Watch Livestream"}
          </Button>
        </div>

        {/* Note */}
        <p className="text-center font-sans text-sm text-text-light">
          The livestream will be available at the scheduled service time.
        </p>
      </div>
    </Modal>
  );
}
