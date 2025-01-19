import { RFPercentage } from "react-native-responsive-fontsize";
import {
  BookmarkIcon,
  CopyIcon,
  HistoryIcon,
  MultiUserIcon,
  PlusIcon,
  SettingIcon,
  ShareIcon,
} from "../Icons";

const menubar = [
  {
    icon: <PlusIcon color={"#121212"} size={RFPercentage(2.5)} />,
    heading: "New Tab",
  },
  // {
  //   icon: <ShareIcon color={"#121212"} size={RFPercentage(2.5)} />,
  //   heading: "Share",
  // },
  {
    icon: <HistoryIcon color={"#121212"} size={RFPercentage(2.5)} />,
    heading: "History",
  },
  // {
  //   icon: <CopyIcon color={"#121212"} size={RFPercentage(2.5)} />,
  //   heading: "Copy Link",
  // },
  // {
  //   icon: <BookmarkIcon color={"#121212"} size={RFPercentage(2.5)} />,
  //   heading: "Bookmark",
  // },
  // {
  //   icon: <MultiUserIcon color={"#121212"} size={RFPercentage(2.5)} />,
  //   heading: "Share with friends",
  // },
  {
    icon: <SettingIcon color={"#121212"} size={RFPercentage(2.5)} />,
    heading: "Settings",
  },
];

export default menubar;
