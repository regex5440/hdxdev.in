"use client";

import { useEffect, useState } from "react";

export default function UserInfoInput() {
  const [extras, setExtras] = useState("");

  useEffect(() => {
    fetch(`/api/geo`)
      .then((res) => res.json())
      .then((payload) => {
        setExtras(JSON.stringify(payload));
      });
  }, [setExtras]);

  return <input type="hidden" name="extras" value={extras} />;
}
