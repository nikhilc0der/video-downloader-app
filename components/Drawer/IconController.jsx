import React from "react";
import {
  DailyMotionIcon,
  EarthIcon,
  FacebookIcon,
  InstagramIcon,
  ThreadsIcon,
  TiktokIcon,
  TwitterIcon,
  VimeoIcon,
  VkIcon,
  WhatsappIcon,
} from "../../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function IconController({ IconName }) {
  switch (IconName) {
    case "Facebook":
      return <FacebookIcon size={RFPercentage(4)} />;
    case "Instagram":
      return <InstagramIcon size={RFPercentage(4)} />;
    case "Tiktok":
      return <TiktokIcon size={RFPercentage(4)} />;
    case "Twitter":
      return <TwitterIcon size={RFPercentage(4)} />;
    case "Dailymotion":
      return <DailyMotionIcon />;
    case "Threads":
      return <ThreadsIcon size={RFPercentage(4)} />;
    case "Vk":
      return <VkIcon size={RFPercentage(4)} />;
    case "Whatsapp":
      return <WhatsappIcon size={RFPercentage(4)} />;
    case "Vimeo":
      return <VimeoIcon size={RFPercentage(4)} />;
    case "Earth":
      return <EarthIcon color={"#121212"} size={RFPercentage(4)} />;
    default:
      return null;
  }
}
