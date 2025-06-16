import { useState, useEffect } from "react";
import type { Adventure, Scene, Choice } from "./types";
import adventures from "./adventures";
import CRTBrailleChart from "./components/BrailleChart";
import "./App.css";

export default function App() {
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [currentId, setCurrentId] = useState<string>("");
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [typedText, setTypedText] = useState<string>("");

  useEffect(() => {
    const defaultAdventure = adventures["black_friday_blowup"];
    setAdventure(defaultAdventure);
    setCurrentId(defaultAdventure.start);
  }, []);

  useEffect(() => {
    if (!adventure || !currentId) return;
    const scene: Scene = adventure.scenes[currentId];
    let i = 0;
    setTypedText("");
    const interval = setInterval(() => {
      if (i < scene.text.length) {
        setTypedText((prev) => prev + scene.text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [currentId, adventure]);

  if (!adventure || !currentId) return <div>Loading...</div>;

  const scene: Scene = adventure.scenes[currentId];

  return (
    <div className="terminal mx-auto my-8 max-w-3xl text-green-400 font-mono p-6 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">{adventure.title}</h1>
      {lastCommand && (
        <p className="text-green-500 mb-2">
          <span className="text-green-300">&gt;</span> {lastCommand}
        </p>
      )}

      {scene.logs && scene.logs.length > 0 && (
        <pre className="bg-vlack text-green-400 p-4 border border-green-700 mb-6 whitespace-pre-wrap">
          {scene.logs.join("\n")}
        </pre>
      )}
      {scene.image && (
        <div className="mb-4">
          <img
            src={`images/${scene.image}`}
            alt="scene visual"
            className="w-full mex-w-lg border border-green-400"
          />
        </div>
      )}
      {scene.chart && scene.chart.type === "braille" && (
        <CRTBrailleChart dataPoints={scene.chart.data} />
      )}
      <p className="mb-4 whitespace-pre-line leading-relaxed text-green-300">
        {typedText}
      </p>
      <div className="flex flex-row items-start gap-3">
        {scene.choices.map((choice: Choice, index: number) => (
          <button
            key={index}
            onClick={() => {
              setCurrentId(choice.nextId);
              if (choice.command) setLastCommand(choice.command);
            }}
            className="bg-green-800 hover:bg-green-700 text-white font-mono text-sm font-bold py-2 px-4 rounded inline-block"
          >
            {choice.label}
          </button>
        ))}
      </div>
      {scene.choices.length > 0 && (
        <p className="blinking-cursor mt-6 text-green-500">
          &gt; Awaiting input
        </p>
      )}
    </div>
  );
}
