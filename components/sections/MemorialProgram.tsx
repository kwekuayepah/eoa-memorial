"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/data/site-config";

export function MemorialProgram() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section id="program" className="bg-bg py-16 px-4">
            <div className="container mx-auto max-w-4xl text-center">
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <SectionHeading
                        title="Memorial Program"
                        subtitle="View or download the official service program"
                    />

                    <div className="mx-auto flex flex-col items-center justify-center gap-6 md:flex-row">
                        {/* View Program Button */}
                        <a
                            href={encodeURI(siteConfig.memorialProgram.viewUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex h-14 w-full min-w-[200px] items-center justify-center gap-3 rounded-md border-2 border-gold px-8 text-lg font-medium text-gold transition-all duration-300 hover:bg-gold/10 hover:shadow-lg dark:hover:bg-gold/5 md:w-auto"
                        >
                            <BookOpen className="h-5 w-5 transition-transform group-hover:scale-110" />
                            <span className="font-sans">View Program</span>
                        </a>

                        {/* Download PDF Button */}
                        <a
                            href={encodeURI(siteConfig.memorialProgram.downloadPath)}
                            download
                            className="group inline-flex h-14 w-full min-w-[200px] items-center justify-center gap-3 rounded-md bg-gold px-8 text-lg font-medium text-bg-card transition-all duration-300 hover:bg-gold/90 hover:shadow-lg md:w-auto"
                        >
                            <Download className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
                            <span className="font-sans">Download PDF</span>
                        </a>
                    </div>

                    <p className="mx-auto mt-8 max-w-md font-sans text-sm text-text-muted">
                        The memorial program contains the complete order of service,
                        full biography, and precious tributes from family and friends.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
