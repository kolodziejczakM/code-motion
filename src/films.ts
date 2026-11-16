import boundlessStill from "../prototypes/tower-lady/assets/boundless.jpg?url";
import akabeiStill from "../prototypes/tower-lady/assets/akabei.jpg?url";

export { default as brandArtwork } from "../prototypes/tower-lady/assets/brand-reference.png?url";
export { default as playIcon } from "../prototypes/tower-lady/assets/player-play.svg?url";

export const films = [
  {
    id: "boundless",
    title: "Boundless, actually",
    year: 2025,
    duration: "4:40",
    isoDuration: "PT4M40S",
    url: "https://www.youtube.com/watch?v=AIIpG5RpMbc",
    image: boundlessStill,
  },
  {
    id: "akabei",
    title: "Akabei",
    year: 2024,
    duration: "11:31",
    isoDuration: "PT11M31S",
    url: "https://www.youtube.com/watch?v=DUy4jVqBocA",
    image: akabeiStill,
  },
  {
    id: "saturday-cleaning",
    title: "Saturday cleaning",
    year: 2021,
    duration: "2 min",
    isoDuration: "PT2M",
    url: "https://www.youtube.com/watch?v=1Uv6I2wPWSQ",
    image: null,
  },
] as const;

export type Film = (typeof films)[number];
