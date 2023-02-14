import { useEffect, useState } from "react";
import { onValue, ref, query, orderByChild } from "firebase/database";
import { db } from "../firebaseConfig";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    try {
      const firebaseQuery = query(ref(db, "notes"), orderByChild("pinned"));
      return onValue(firebaseQuery, (snapshot) => {
        if (snapshot.exists()) {
          const data = [];
          snapshot.forEach((child) => {
            data.push(child.val());
          });
          setData(Object.values(data));
        } else {
          setData([]);
        }
        setLoading(false);
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);

  return { loading, data };
};

export default useFetch;
