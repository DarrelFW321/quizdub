'use client';

import React, { useState, useEffect } from 'react';
import TypingTest from '@/components/ui/typingTest';
import { Button } from '@/components/ui/button';
import Link from "next/link";
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
      <Link href= "/login">
      <Button> Sign in </Button>
      </Link>
      <Link href= "/api/auth/signout">
      <Button> Sign out </Button>
      </Link>
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


