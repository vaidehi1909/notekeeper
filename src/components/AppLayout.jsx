import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotesGridLayout from "./NotesGridLayout";
import { db } from "../firebaseConfig";
import { onValue, ref, query, orderByChild } from "firebase/database";
import Loader from "./Loader";

const AppLayout = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const firebaseQuery = query(ref(db, "notes"), orderByChild("pinned"));
    return onValue(firebaseQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = [];
        snapshot.forEach((child) => {
          data.push(child.val());
        });
        setNotes(Object.values(data));
        setLoading(false);
      }
    });
  }, []);
  return (
    <div>
      <Header />
      {loading ? <Loader /> : <NotesGridLayout notes={notes} />}
    </div>
  );
};

export default AppLayout;

/*
    <Row>
      <Col span={22} offset={1}>
        <Header />
        {loading ? <Loader /> : <NotesGridLayout notes={notes} />}
      </Col>
    </Row>
*/
