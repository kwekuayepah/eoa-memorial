export const siteConfig = {
  // Personal
  name: "Edward Owusu-Agyei",
  nameShort: "Edward",
  title: "Celebration of Life",
  birthDate: "1948-08-16",
  deathDate: "2026-01-03",
  birthDateDisplay: "16th August 1948",
  deathDateDisplay: "3rd January 2026",

  // Scripture
  scripture: {
    text: "And I heard a voice from heaven saying, 'Write this: Blessed are the dead who die in the Lord from now on.' 'Blessed indeed,' says the Spirit, 'that they may rest from their labours, for their deeds follow them!'",
    reference: "Revelation 14:13",
  },

  // Service
  serviceDate: "2026-03-20T07:00:00+00:00", // GMT for countdown
  serviceDateDisplay: "Friday, 20th March 2026",
  venue: {
    name: "Transitions Funeral Home",
    address: "Haatso-Atomic Rd, Accra",
    mapsUrl: "https://maps.app.goo.gl/c77WsnmY4uAoiJpG6?g_st=ic",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.2!3d5.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMDAuMCJOIDDCsDEyJzAwLjAiRQ!5e0!3m2!1sen!2sus!4v1234567890!5m2!1sen!2sus",
  },

  // Livestream
  livestreamUrl: "https://efuneral.enterprisegroup.net.gh/live-streaming",

  // Officiating
  officiant: "Very Rev. Dr. Vincent Agbemenya Adzika",
  inAttendance: ["Transitions Choir"],

  // Images
  heroImage: "/images/hero/edward-owusu-agyei.jpg",
  ogImage: "/images/og-image.jpg",

  // Meta
  siteUrl: "https://your-memorial.vercel.app", // update after deploy
  description:
    "Celebrating the life of Edward Owusu-Agyei (1948–2026). Join us in honoring his memory.",
} as const;
