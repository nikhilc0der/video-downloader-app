import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import CollectionScreenTopBar from "../components/Collections/CollectionScreenTopBar";
import CollectionSection from "../components/Collections/CollectionSection";
import CollectionFormModal from "../components/Collections/CollectionFormModal";

export default function CollectionScreen() {
  const { collectionItem } = useSelector((state) => state.collection);
  const navigation = useNavigation();
  const [isCollection, setCollection] = useState(false);

  return (
    <>
      <Header>
        <CollectionScreenTopBar setCollection={setCollection} />
      </Header>
      <CollectionSection
        collectionItem={collectionItem}
        navigation={navigation}
      />
      <CollectionFormModal
        isCollection={isCollection}
        setCollection={setCollection}
      />
    </>
  );
}
