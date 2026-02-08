"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatRelativeTime } from "@/lib/utils";
import type { Tribute } from "@/lib/db";

export function TributeWall() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Fetch initial tributes on mount
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const response = await fetch("/api/tributes?page=1&limit=10");
        const data = await response.json();
        if (data.tributes) {
          setTributes(data.tributes);
          setHasMore(data.pagination.hasMore);
        }
      } catch (error) {
        console.error("Failed to fetch tributes:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchInitial();
  }, []);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/tributes?page=${page + 1}&limit=10`);
      const data = await response.json();

      if (data.tributes && data.tributes.length > 0) {
        setTributes((prev) => [...prev, ...data.tributes]);
        setPage((prev) => prev + 1);
        setHasMore(data.pagination.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load tributes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitialLoading) {
    return (
      <section className="bg-bg-alt py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <p className="text-center font-sans text-text-muted">Loading tributes...</p>
        </div>
      </section>
    );
  }

  if (tributes.length === 0) {
    return null;
  }

  return (
    <section className="bg-bg-alt py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-8 font-serif text-3xl font-semibold text-text md:text-4xl">
            Tributes & Condolences
          </h2>

          {/* Tribute Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {tributes.map((tribute, index) => (
              <motion.div
                key={tribute.id}
                initial={
                  prefersReducedMotion ? {} : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-lg border border-border bg-bg-card p-6 shadow-sm"
              >
                {/* Header */}
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold text-text">
                      {tribute.name}
                    </h3>
                    {tribute.relationship && (
                      <Badge variant="gold" className="mt-2">
                        {tribute.relationship}
                      </Badge>
                    )}
                  </div>
                  {tribute.photo_url && (
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={tribute.photo_url}
                        alt={`${tribute.name}'s photo`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                </div>

                {/* Message */}
                <p className="font-sans text-base leading-relaxed text-text-muted">
                  {tribute.message}
                </p>

                {/* Date */}
                <p className="mt-4 font-sans text-xs text-text-light">
                  {formatRelativeTime(tribute.created_at)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={loadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
