import React from "react";
import Header from "./Header";
import NotesGridLayout from "./NotesGridLayout";
import Loader from "./Loader";
import useFetch from "../hooks/useFetch";

const AppLayout = () => {
  const { loading, data } = useFetch();
  return (
    <>
      <Header />
      {loading ? <Loader /> : <NotesGridLayout notes={data} />}
    </>
  );
};

export default AppLayout;
