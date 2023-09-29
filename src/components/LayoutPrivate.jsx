"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function LayoutPrivate({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession(true);


  if (status === "loading") {
    return null;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return <div className="min-h-[70vh]">{children}</div>;
}
