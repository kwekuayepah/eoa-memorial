export type ServiceItem = {
  event: string;
  detail?: string; // hymn reference, minister name, etc.
  performer?: string; // who performs this item
};

export type ServicePart = {
  part: number;
  title: string;
  time?: string;
  items: ServiceItem[];
};

export const serviceOrder: ServicePart[] = [
  {
    part: 1,
    title: "Pre-Burial Service",
    items: [
      { event: "Procession" },
      { event: "Opening Hymn", detail: "PHB 810" },
      { event: "Hymns and Tributes", detail: "PHB 791" },
      { event: "Covering of Casket", detail: "PHB 702" },
      { event: "Songs", performer: "Transitions Choir" },
    ],
  },
  {
    part: 2,
    title: "Burial Service",
    items: [
      { event: "Sentences" },
      { event: "Hymns", detail: "PHB 329 / MHB 427" },
      { event: "Biography" },
      { event: "Song Ministration", performer: "Dr. Peter Twum-Barimah" },
      { event: "Tributes" },
      { event: "Scripture Readings" },
      {
        event: "Sermon",
        performer: "Very Rev. Dr. Vincent Agbemenya Adzika",
      },
      { event: "Apostle's Creed" },
      { event: "Offertory", performer: "Transitions Choir" },
      { event: "Hymns", detail: "PHB 10 / PHB 557" },
      { event: "Transitions Choir", detail: "PHB 477" },
      { event: "Commemoration and Commendation", detail: "PHB 11" },
      { event: "Concluding Prayers & the Lord's Prayer" },
      { event: "Announcements", performer: "Mr. Dei" },
      { event: "Acknowledgement of Guests", performer: "Mr. Dei" },
      { event: "Vote of Thanks", performer: "Mr. Dei" },
      { event: "Closing Hymn", detail: "PHB 331" },
      { event: "Benediction" },
      { event: "Recession" },
    ],
  },
  {
    part: 3,
    title: "Graveside",
    items: [
      { event: "Hymn" },
      { event: "Sentences" },
      { event: "Prayers" },
      { event: "Committal" },
      { event: "Closing Hymn" },
      { event: "Benediction" },
    ],
  },
];
