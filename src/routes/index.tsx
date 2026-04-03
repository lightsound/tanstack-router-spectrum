import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [isBlue, setIsBlue] = useState(false);
  return (
    <main className="home-main">
      <div className="home-stack">
        <h1 className={isBlue ? "home-heading home-heading--blue" : "home-heading"}>
          Hello World!
        </h1>
        <button type="button" onClick={() => setIsBlue((prev) => !prev)}>
          Toggle
        </button>
      </div>
    </main>
  );
}
