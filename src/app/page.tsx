"use client";

import { useEffect, useState } from "react";

function playRandomSound(frequency: number) {
  let context = new AudioContext();
  let oscillator = context.createOscillator();
  let gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  setTimeout(() => {
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);
    oscillator.stop();
    oscillator.disconnect();
  }, 3000);
}

export default function Home() {
  const maxFrequency = 493.88;
  const minFrequency = 261.63;
  const [timesPlayed, setTimesPlayed] = useState(0);
  const [userAnswer, setUserAnswer] = useState(Math.floor(maxFrequency / 2));
  const [randomFrequency, setRandomFrequency] = useState(
    Math.floor(Math.random() * (maxFrequency - minFrequency) + minFrequency)
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [difference, setDifference] = useState(0);
  useEffect(() => {
    playRandomSound(randomFrequency);
  }, [timesPlayed]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showAnswer ? (
        <>
          <p>Answer: {randomFrequency} Hz</p>
          {difference >= 0 ? (
            <p>
              You were too low by{" "}
              <span className="text-green-500">{difference}</span> Hz
            </p>
          ) : (
            <p>
              You were too high by{" "}
              <span className="text-red-500">{difference}</span> Hz
            </p>
          )}
        </>
      ) : (
        <></>
      )}

      <button
        className="bg-black text-white p-2 rounded-lg hover:bg-gray-700"
        onClick={() => {
          setShowAnswer(false);
          setTimesPlayed(timesPlayed + 1);
        }}
      >
        Generate Random Sound
      </button>
      <p>Your estimate: {userAnswer}</p>
      <input
        id="default-range"
        type="range"
        max={maxFrequency}
        min={minFrequency}
        onChange={(event) => {
          setUserAnswer(Number(event.target.value));
        }}
        value={String(userAnswer)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <button
        className="bg-black text-white p-2 rounded-lg hover:bg-gray-700"
        onClick={() => {
          setShowAnswer(true);
          setDifference(Math.floor(randomFrequency - userAnswer));

          setRandomFrequency(
            Math.floor(
              Math.random() * (maxFrequency - minFrequency) + minFrequency
            )
          );
        }}
      >
        Submit
      </button>
    </main>
  );
}
