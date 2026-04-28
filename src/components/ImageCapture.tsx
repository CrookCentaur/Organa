'use client';

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from 'react';
import { IconUpload, IconCamera, IconLeaf, IconClose, IconSearch, IconRefresh, IconWarning } from './Icons';
import styles from './ImageCapture.module.css';

interface ImageCaptureProps {
  onIdentify: (imageData: string, mimeType: string) => void;
  isLoading: boolean;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageCapture({ onIdentify, isLoading }: ImageCaptureProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [mimeType, setMimeType] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a JPG, PNG, WebP, or GIF image.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Image is too large. Maximum size is 10MB.');
      return;
    }

    setFileName(file.name);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleRemove = useCallback(() => {
    setPreview(null);
    setFileName('');
    setMimeType('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  }, []);

  const handleIdentify = useCallback(() => {
    if (preview && mimeType) {
      onIdentify(preview, mimeType);
    }
  }, [preview, mimeType, onIdentify]);

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loaderContainer}>
          <div className={styles.loaderRing}></div>
          <div className={styles.loadingLeaf}>
            <IconLeaf size={48} />
          </div>
        </div>
        <p className={styles.loadingText}>Analyzing organism...</p>
        <p className={styles.loadingSubtext}>Our AI is identifying the species</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {!preview ? (
        <>
          <div
            className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload an image by clicking or dragging"
            id="image-dropzone"
          >
            <div className={styles.dropzoneContent}>
              <div className={styles.uploadIcon}>
                <IconUpload size={28} />
              </div>
              <h3 className={styles.dropzoneTitle}>
                {isDragging ? 'Drop your image here' : 'Upload a photo'}
              </h3>
              <p className={styles.dropzoneHint}>
                Drag & drop an image or click to browse
              </p>
              <div className={styles.dropzoneFormats}>
                <span className={styles.formatTag}>JPG</span>
                <span className={styles.formatTag}>PNG</span>
                <span className={styles.formatTag}>WebP</span>
                <span className={styles.formatTag}>GIF</span>
              </div>
            </div>
          </div>

          <div className={styles.divider}>or</div>

          <button
            className={styles.cameraBtn}
            onClick={() => cameraInputRef.current?.click()}
            id="camera-capture-btn"
          >
            <IconCamera size={20} /> Take a photo with camera
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className={styles.hiddenInput}
            id="file-input"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className={styles.hiddenInput}
            id="camera-input"
          />
        </>
      ) : (
        <>
          <div className={styles.preview}>
            <img
              src={preview}
              alt="Uploaded organism"
              className={styles.previewImage}
            />
            <div className={styles.previewOverlay}>
              <span className={styles.previewFilename}>{fileName}</span>
              <button
                onClick={handleRemove}
                className={styles.removeBtn}
                id="remove-image-btn"
              >
                <IconClose size={14} /> Remove
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              onClick={handleIdentify}
              className={styles.identifyBtn}
              disabled={isLoading}
              id="identify-btn"
            >
              <IconSearch size={18} /> Identify Organism
            </button>
            <button
              onClick={handleRemove}
              className={styles.retakeBtn}
              id="retake-btn"
            >
              <IconRefresh size={16} /> New Photo
            </button>
          </div>
        </>
      )}

      {error && (
        <div className={styles.errorContainer} role="alert">
          <div className={styles.errorMessage}>
            <IconWarning size={18} /> {error}
          </div>
        </div>
      )}
    </div>
  );
}
