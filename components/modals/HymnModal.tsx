"use client";

import { Modal } from "@/components/modals/Modal";
import { Music } from "lucide-react";

interface HymnModalProps {
    isOpen: boolean;
    onClose: () => void;
    hymn: {
        title: string;
        lyrics: string;
    } | null;
}

export function HymnModal({ isOpen, onClose, hymn }: HymnModalProps) {
    if (!hymn) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={hymn.title}>
            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-gold/10 p-3 text-gold">
                        <Music className="h-6 w-6" />
                    </div>
                </div>
                <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-text text-center italic">
                    {hymn.lyrics}
                </div>
            </div>
        </Modal>
    );
}
