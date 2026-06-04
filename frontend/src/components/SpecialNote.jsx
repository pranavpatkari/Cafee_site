import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function SpecialNote() {
  const [special, setSpecial] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "special", "today"),
      (snap) => {
        if (snap.exists()) {
          setSpecial(snap.data().text);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (!special) return null;

  return <div className="sticky-note">{special}</div>;
}
