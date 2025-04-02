'use client';

import { useEffect, useState } from 'react';

export default function useRandomWords(count = 5) {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWords = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/words/${count}`);
      if (!response.ok) throw new Error("Failed to fetch words");

      const data = await response.json();
      setWords(data.words);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return { words, loading, error, fetchWords };
}
