"use client";

import { useEffect, useState } from "react";

export default function UserInfoInput() {
  const [extras, setExtras] = useState("");

  useEffect(() => {
    fetch(
      `https://api.visitorapi.com/api/?pid=${process.env.NEXT_PUBLIC_PROJECT_ID}`
    )
      .then((res) => res.json())
      .then((payload) => {
        setExtras(JSON.stringify(payload.data));
      });
  }, [setExtras]);

  return <input type="hidden" name="extras" value={extras} />;
}
