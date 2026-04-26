'use client';

import { useState, useCallback } from 'react';
import ImageCapture from '@/components/ImageCapture';
import OrganismCard from '@/components/OrganismCard';
import { OrganismResult } from '@/types';
import { IconSearch, IconCheckCircle, IconWarning } from '@/components/Icons';
import styles from './page.module.css';

export default function IdentifyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OrganismResult | null>(null);
  const [imageData, setImageData] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleIdentify = useCallback(async (image: string, mimeType: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setImageData(image);

    try {
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, mimeType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Identification failed');
      }

      setResult({
        ...data,
        imageData: image,
      } as OrganismResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleNewScan = useCallback(() => {
    setResult(null);
    setImageData('');
    setError(null);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {result ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)' }}>
                <IconCheckCircle size={32} /> Organism Identified!
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)' }}>
                <IconSearch size={32} /> Identify an Organism
              </span>
            )}
          </h1>
          <p className={styles.subtitle}>
            {result
              ? "Here's what we found"
              : 'Upload or capture a photo of any living organism'}
          </p>
        </div>

        {!result && (
          <ImageCapture onIdentify={handleIdentify} isLoading={isLoading} />
        )}

        {error && !isLoading && (
          <div
            style={{
              padding: 'var(--space-4) var(--space-5)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(200, 50, 50, 0.06)',
              border: '1px solid rgba(200, 50, 50, 0.15)',
              color: '#8B2020',
              fontSize: '0.9rem',
              marginTop: 'var(--space-4)',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)'
            }}
            role="alert"
          >
            <IconWarning size={18} /> {error}
          </div>
        )}

        {result && (
          <div className={styles.resultSection}>
            <OrganismCard
              result={result}
              imageData={imageData}
              onNewScan={handleNewScan}
            />
          </div>
        )}
      </div>
    </div>
  );
}
