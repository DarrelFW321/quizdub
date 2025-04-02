'use client';

import React, { useState, useEffect } from 'react';
import TypingTest from '@/components/ui/typingTest';
import SignIn from '@/components/SignIn';
import { Button } from '@/components/ui/button';
import DropdownSelector from '@/components/ui/dropdownSelector';

export default function Home() {
  const [wordCount, setWordCount] = useState("5"); // Default word count
  const [timeLimit, setTimeLimit] = useState("30"); // Default time limit (in seconds)

  // Options for word count and time limit
  const wordCountOptions = ["5", "30", "60"];
  const timeLimitOptions = ["30", "60"];

  // Handlers for changes
  const handleWordCountChange = (value: string) => {
    setWordCount(value);
  };

  const handleTimeLimitChange = (value: string) => {
    setTimeLimit(value);
  };

  return (
    <>
      <Button asChild>
        <a href="/api/auth/login">Login</a>
      </Button>
      <Button asChild>
       <a href="/api/auth/logout">Logout</a>
      </Button>
        <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Typing Test Mode Selector</h2>

        <div className="flex gap-4 mb-4">
          <DropdownSelector
            label="Word Count"
            options={wordCountOptions}
            selectedValue={wordCount}
            onSelect={handleWordCountChange}
          />
          <DropdownSelector
            label="Time Limit"
            options={timeLimitOptions}
            selectedValue={timeLimit}
            onSelect={handleTimeLimitChange}
          />
        </div>

        <TypingTest wordCount={parseInt(wordCount)} timeLimit={parseInt(timeLimit)} />
      </div>
    </>
  );
}
