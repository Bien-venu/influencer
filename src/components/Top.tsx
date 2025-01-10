"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Top = () => {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("name");

    if (username && username.split("").length > 0) {
      setShowLogin(false);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("name");
    window.location.reload();
  }

  return (
    <div className="flex w-full items-center justify-between gap-4 border-y px-8 py-4 sm:px-20 xl:px-72">
      <Link href="/" className="text-2xl font-semibold">
        Influence
      </Link>

      {showLogin ? (
        <Link
          href="/login"
          className="flex cursor-pointer rounded bg-primary p-2 px-4 text-sm text-white"
        >
          Login
        </Link>
      ) : (
        <div
          onClick={handleLogout}
          className="flex cursor-pointer rounded bg-primary p-2 px-4 text-sm text-white"
        >
          Logout
        </div>
      )}
    </div>
  );
};

export default Top;
