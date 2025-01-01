"use client";
import React, { useEffect, useState } from "react";

export default function HeaderContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [small, setSmall] = useState(false);

  useEffect(() => {
    function onScroll() {
      console.log(window.scrollY);

      if (!small && window.scrollY > 200) {
        setSmall(true);
      } else if (small && window.scrollY <= 200) {
        setSmall(false);
      }
    }

    document.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <header
      className={`flex items-center px-4 gap-x-2 w-full fixed transition-all ${small ? "h-14 scale-90" : "h-20 scale-100"}`}
    >
      {children}
    </header>
  );
}
