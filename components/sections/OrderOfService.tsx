"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/data/site-config";
import { serviceOrder } from "@/lib/data/service-order";

export function OrderOfService() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="service" className="bg-bg py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Order of Service"
            subtitle={siteConfig.serviceDateDisplay}
          />

          {/* Officiating Minister Card */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12 rounded-lg border-2 border-gold bg-bg-card p-6 text-center shadow-sm"
          >
            <p className="font-sans text-sm font-medium uppercase tracking-wider text-gold">
              Officiating Minister
            </p>
            <p className="mt-2 font-serif text-xl font-semibold text-text dark:text-gold md:text-2xl">
              {siteConfig.officiant}
            </p>
          </motion.div>

          {/* In Attendance */}
          {siteConfig.inAttendance.length > 0 && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-8 text-center"
            >
              <p className="font-sans text-sm text-text-muted">
                <span className="font-medium">In Attendance:</span>{" "}
                {siteConfig.inAttendance.join(", ")}
              </p>
            </motion.div>
          )}

          {/* Service Parts Accordion */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion>
              {serviceOrder.map((part) => (
                <AccordionItem
                  key={part.part}
                  title={`Part ${part.part}: ${part.title}`}
                  defaultOpen={part.part === 1}
                >
                  <div className="space-y-0">
                    {part.items.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-4 border-l-4 border-gold-muted py-3 pl-4 ${
                          index % 2 === 0 ? "bg-bg-alt" : "bg-bg"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-gold" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-sans font-medium text-text">
                              {item.event}
                            </span>
                            {item.detail && (
                              <Badge variant="gold">{item.detail}</Badge>
                            )}
                          </div>
                          {item.performer && (
                            <p className="mt-1 font-sans text-sm text-text-muted">
                              {item.performer}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
