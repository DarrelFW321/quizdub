'use client';

import { useState, useEffect } from "react";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useRandomWords from '@/components/randomWords';

export default function TypingTest({ wordCount, timeLimit }: { wordCount: number, timeLimit: number }) {
  const { words, loading, error, fetchWords } = useRandomWords(wordCount);
  const [prompt, setPrompt] = useState("");
  const [userInput, setUserInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyCount, setKeyCount] = useState(0);
  const [loggedKeys, setLoggedKeys] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timeLimit);

  // Reset test when words change
  useEffect(() => {
    if (words.length > 0) {
      setPrompt(words.join(" "));
      resetTest();
    }
  }, [words]);

  useEffect(() => {
    if (wordCount > 0) {
      fetchWords(); // Automatically fetch new words when wordCount changes
    }
  }, [wordCount]);

  // Handle keypresses
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      const ignoredKeys = ['Shift', 'CapsLock', 'Alt', 'Control', 'Meta', 'Enter', 'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

      if (ignoredKeys.includes(key)) return;

      // Start timer only on first correct key press
      if (startTime === null && key === prompt[currentIndex]) {
        setStartTime(Date.now());
      }

      setKeyCount((prev) => prev + 1);
      setLoggedKeys((prev) => [...prev, key].slice(-10));

      if (key === prompt[currentIndex]) {
        setCurrentIndex((prev) => prev + 1);
        setUserInput((prev) => prev + key);
      }

      if (currentIndex + 1 === prompt.length) setIsFinished(true);
    };

    if (!isFinished) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [prompt, currentIndex, startTime, isFinished]);
 
  useEffect(() => {
    setRemainingTime(timeLimit);
  }, [timeLimit]);
  // Timer countdown effect (only starts when `startTime` is set)
  useEffect(() => {
    if (!startTime || isFinished || remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, remainingTime, isFinished]); // Now dependent on `startTime`

  const calculateWPM = () => {
    if (!startTime || currentIndex === 0) return 0;

    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const elapsedMinutes = elapsedSeconds / 60;

    if (elapsedMinutes <= 0) return 0;

    return (currentIndex / 5) / elapsedMinutes;
  };

  const calculateAccuracy = () => {
    if (userInput.length === 0) return '100.00';
    const accuracy = (currentIndex / keyCount) * 100;
    return accuracy.toFixed(2);
  };

  const resetTest = () => {
    setUserInput("");
    setCurrentIndex(0);
    setKeyCount(0);
    setLoggedKeys([]);
    setStartTime(null);  // Ensure startTime is reset
    setIsFinished(false);
    setRemainingTime(timeLimit);
  };

  const changePrompt = () => {
    fetchWords();
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6 mb-4">
        <h2 className="text-2xl font-bold mb-4">Typing Test</h2>
        <p className="mb-4">
          {prompt.split('').map((char, index) => (
            <span key={index} className={
              index < currentIndex ? 'text-green-500' :
              index === currentIndex ? 'bg-yellow-200' :
              ''
            }>
              {char}
            </span>
          ))}
        </p>
        <div className="mb-4">
          <strong>Your input:</strong> {userInput}
        </div>
        <div>
          <strong>Last keys pressed:</strong> {loggedKeys.join(', ')}
        </div>
        <div className="text-center">
          <p>Time remaining: {remainingTime} seconds</p>
          <p className="text-xl font-bold">Results:</p>
          <p>WPM: {calculateWPM().toFixed(2)}</p>
          <p>Accuracy: {calculateAccuracy()}%</p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button onClick={resetTest}>Retry</Button>
          <Button onClick={changePrompt} disabled={loading}>
            {loading ? "Loading..." : "Change Prompt"}
          </Button>
        </div>
        {error && <p className="text-red-500 mt-2">⚠️ {error}</p>}
      </Card>
    </div>
  );
}
