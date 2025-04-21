import React from "react";
import { useQuery } from "./useQuery";
import { CollectionView } from "./CollectionView";
import { SessionView } from "./SessionView";

export const App = () => {
  const { params } = useQuery();

  if (!params.session) {
    return <CollectionView />;
  }
  return <SessionView />;
};
