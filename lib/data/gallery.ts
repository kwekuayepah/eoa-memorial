export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export const galleryImages: GalleryImage[] = [
  // Add gallery photos here when available
  // Example:
  // { src: "/images/gallery/photo1.jpg", alt: "Description", caption: "Optional caption" },
];

export const hasGalleryPhotos = galleryImages.length > 0;
