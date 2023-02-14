import React from "react";
import NotesGridLayout from "./NotesGridLayout";
import Loader from "./Loader";
import useFetch from "../hooks/useFetch";

const AppLayout = () => {
  const { loading, data } = useFetch();
  return (
    <>
      <h1 className="title">Note Keeper</h1>
      {loading ? <Loader /> : <NotesGridLayout notes={data} />}
    </>
  );
};

export default AppLayout;
