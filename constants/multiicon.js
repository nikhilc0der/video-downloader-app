import { RFPercentage } from "react-native-responsive-fontsize";
import {
  DailyMotionIcon,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  RedditIcon,
  ThreadsIcon,
  TiktokIcon,
  TwitterIcon,
  VimeoIcon,
  VkIcon,
  WhatsappIcon,
} from "../Icons";

const multiicons = [
  {
    id: 1,
    icon: <FacebookIcon size={RFPercentage(4)} />,
    color: "#3F51B5",
    title: "Facebook",
    link: "https://www.facebook.com/",
  },
  {
    id: 2,
    icon: <InstagramIcon size={RFPercentage(4)} />,
    color: "#d71d93",
    title: "Instagram",
    link: "https://www.instagram.com/",
  },
  {
    id: 3,
    icon: <TiktokIcon size={RFPercentage(4)} />,
    color: "#121212",
    title: "Tiktok",
    link: "https://www.tiktok.com",
  },
  {
    id: 4,
    icon: <TwitterIcon size={RFPercentage(4)} />,
    color: "#121212",
    title: "Twitter",
    link: "https://twitter.com/",
  },
  {
    id: 5,
    icon: <DailyMotionIcon />,
    color: "#42a5f5",
    title: "Dailymotion",
    link: "https://www.dailymotion.com/in",
  },
  // {
  //   id: 6,
  //   icon: <VkIcon size={RFPercentage(4)} />,
  //   color: "#1976d2",
  //   title: "Vk",
  //   link: "https://vk.com/",
  // },
  {
    id: 6,
    icon: <ThreadsIcon size={RFPercentage(4)} />,
    color: "#121212",
    title: "Threads",
    link: "https://www.threads.net/",
  },
  {
    id: 7,
    icon: <WhatsappIcon size={RFPercentage(4)} />,
    color: "#25d366",
    title: "Whatsapp",
    link: "https://web.whatsapp.com/",
  },
  {
    id: 8,
    icon: <VimeoIcon size={RFPercentage(4)} />,
    color: "#1ab7ea",
    title: "Vimeo",
    link: "https://vimeo.com/",
  },
  {
    id: 9,
    icon: <PinterestIcon size={RFPercentage(4)} color={"#fff"} />,
    color: "#e61e21",
    title: "Pinterest",
    link: "https://in.pinterest.com/",
  },
  {
    id: 10,
    icon: <RedditIcon size={RFPercentage(4)} color={"#fff"} />,
    color: "#f04302",
    title: "Reddit",
    link: "https://www.reddit.com/",
  },
];

export default multiicons;
