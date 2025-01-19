import React, { useState } from "react";
import NoHistory from "../components/Progress/NoHistory";
import HowtoDownload from "../components/Progress/HowtoDownload";
import { HistoryIcon } from "../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import CompleteDownload from "../components/Progress/CompleteDownload";
import Header from "../components/Header";
import DownloadScreenTopBar from "../components/Progress/DownloadScreenTopBar";
import { LogBox } from "react-native";

function FinishedScreen({ FinishLength }) {
  LogBox.ignoreAllLogs();
  const [isMultiDelete, setMultiDelete] = useState(false);
  const [allDelete, setAllDelete] = useState(false);
  return (
    <>
      <Header>
        <DownloadScreenTopBar
          FinishLength={FinishLength}
          setMultiDelete={setMultiDelete}
          isMultiDelete={isMultiDelete}
          setAllDelete={setAllDelete}
          allDelete={allDelete}
        />
      </Header>

      {FinishLength.length > 0 ? (
        <CompleteDownload
          FinishLength={FinishLength.reverse()}
          isMultiDelete={isMultiDelete}
          setMultiDelete={setMultiDelete}
          allDelete={allDelete}
          setAllDelete={setAllDelete}
        />
      ) : (
        <NoHistory
          text={"You Haven't Downloaded The Videos / Photos Yet"}
          icon={<HistoryIcon size={RFPercentage(3)} color={"#bdbdbd"} />}
        />
      )}

      <HowtoDownload />
    </>
  );
}

export default FinishedScreen;
