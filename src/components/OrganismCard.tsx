'use client';

import { useState } from 'react';
import { OrganismResult, OrganismType } from '@/types';
import { addToHistory } from '@/lib/storage';
import {
  IconLeaf, IconPaw, IconButterfly, IconBird,
  IconDroplet, IconSun, IconScissors, IconShield,
  IconHome, IconHeart, IconClock, IconGlobe,
  IconPin, IconLightbulb, IconBookmark, IconCamera,
  IconCheckCircle, IconDocument, IconRefresh, IconSliders,
  IconSearch, IconClose, IconWarning, IconTrash,
} from './Icons';
import styles from './OrganismCard.module.css';

interface OrganismCardProps {
  result: OrganismResult;
  imageData?: string;
  compact?: boolean;
  onNewScan?: () => void;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}

const TYPE_ICONS: Record<OrganismType, React.ReactNode> = {
  plant: <IconLeaf size={14} />,
  animal: <IconPaw size={14} />,
  insect: <IconButterfly size={14} />,
  bird: <IconBird size={14} />,
  inanimate: <IconWarning size={14} />,
};

const CARE_LABELS: Record<string, { icon: React.ReactNode; label: string }> = {
  // Plant
  watering: { icon: <IconDroplet size={16} />, label: 'Watering' },
  sunlight: { icon: <IconSun size={16} />, label: 'Sunlight' },
  soil: { icon: <IconLeaf size={16} />, label: 'Soil' },
  fertilizer: { icon: <IconSliders size={16} />, label: 'Fertilizer' },
  pruning: { icon: <IconScissors size={16} />, label: 'Pruning' },
  companionPlanting: { icon: <IconHeart size={16} />, label: 'Companion Planting' },
  harvest: { icon: <IconCheckCircle size={16} />, label: 'Harvest' },
  commonIssues: { icon: <IconShield size={16} />, label: 'Common Issues' },
  // Animal
  habitat: { icon: <IconHome size={16} />, label: 'Habitat' },
  diet: { icon: <IconDocument size={16} />, label: 'Diet' },
  temperament: { icon: <IconHeart size={16} />, label: 'Temperament' },
  healthSigns: { icon: <IconShield size={16} />, label: 'Health Signs' },
  lifespan: { icon: <IconClock size={16} />, label: 'Lifespan' },
  exerciseNeeds: { icon: <IconRefresh size={16} />, label: 'Exercise' },
  vetCare: { icon: <IconCheckCircle size={16} />, label: 'Vet Care' },
  // Insect
  beneficialOrPest: { icon: <IconShield size={16} />, label: 'Beneficial or Pest' },
  lifecycle: { icon: <IconRefresh size={16} />, label: 'Life Cycle' },
  seasonalActivity: { icon: <IconClock size={16} />, label: 'Seasonal Activity' },
  gardenImpact: { icon: <IconLeaf size={16} />, label: 'Garden Impact' },
  controlOrAttract: { icon: <IconSliders size={16} />, label: 'Control / Attract' },
  pollinationRole: { icon: <IconButterfly size={16} />, label: 'Pollination Role' },
  // Bird
  migrationPatterns: { icon: <IconGlobe size={16} />, label: 'Migration' },
  nestingHabits: { icon: <IconHome size={16} />, label: 'Nesting' },
  birdwatchingTips: { icon: <IconSearch size={16} />, label: 'Birdwatching Tips' },
  conservationStatus: { icon: <IconShield size={16} />, label: 'Conservation Status' },
  howToAttract: { icon: <IconLeaf size={16} />, label: 'How to Attract' },
  regionalPresence: { icon: <IconPin size={16} />, label: 'Regional Presence' },
  // Inanimate
  notice: { icon: <IconWarning size={16} />, label: 'Notice' },
};
export default function OrganismCard({
  result,
  imageData,
  compact = false,
  onNewScan,
  onClick,
  onDelete,
}: OrganismCardProps) {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'essentials'>('all');
  const [showImageModal, setShowImageModal] = useState(false);

  const careEntries = Object.entries(result.careInfo || {});
  const essentialKeys = careEntries.slice(0, 4);
  const displayEntries = activeTab === 'essentials' ? essentialKeys : careEntries;

  const handleSave = () => {
    addToHistory({
      ...result,
      imageData: imageData || result.imageData || '',
    });
    setSaved(true);
  };

  const badgeClass = `badge badge-${result.type}`;

  return (
    <div
      className={`${styles.card} ${compact ? styles.compact : ''}`}
      onClick={compact ? onClick : undefined}
      role={compact ? 'button' : undefined}
      tabIndex={compact ? 0 : undefined}
    >
      {/* Header */}
      <div className={styles.cardHeader}>
        {(imageData || result.imageData) && (
          <div
            className={styles.thumbWrapper}
            onClick={() => setShowImageModal(true)}
            role="button"
            aria-label="Enlarge image"
            title="Click to enlarge"
          >
            <img
              src={imageData || result.imageData}
              alt={result.commonName}
              className={styles.cardThumb}
            />
            <div className={styles.thumbOverlay}>
              <IconSearch size={20} />
            </div>
          </div>
        )}
        <div className={styles.cardInfo}>
          <div className={styles.cardHeaderRow}>
            <div className={styles.cardNameRow}>
              <h2 className={styles.commonName}>
                {result.type === 'inanimate'
                  ? "Not an organism!"
                  : result.commonName}
              </h2>
              {result.type !== 'inanimate' && (
                <p className={styles.scientificName}>{result.scientificName}</p>
              )}
            </div>
          </div>
          
          <div className={styles.cardMeta}>
            <span className={badgeClass}>
              {TYPE_ICONS[result.type] || <IconLeaf size={14} />}
              {result.type.toUpperCase()}
            </span>
            {!compact && (
              <div className={styles.confidence}>
                <div className={styles.confidenceBar}>
                  <div
                    className={styles.confidenceFill}
                    style={{ width: `${(result.confidence || 0) * 100}%` }}
                  />
                </div>
                <span className={styles.confidenceText}>
                  {Math.round((result.confidence || 0) * 100)}% confident
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {!compact && (
        <>
          {/* Summary */}
          <div className={styles.summary}>{result.summary}</div>

          {/* Fun Fact */}
          {result.funFact && (
            <div className={styles.funFact}>
              <span className={styles.funFactIcon}><IconLightbulb size={20} /></span>
              <p>
                <span className={styles.funFactLabel}>Did you know?</span>
                {result.funFact}
              </p>
            </div>
          )}

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Care Info
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'essentials' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('essentials')}
            >
              Essentials
            </button>
          </div>

          {/* Care Grid */}
          <div className={styles.careGrid}>
            {displayEntries.map(([key, value]) => {
              const meta = CARE_LABELS[key] || { icon: <IconDocument size={16} />, label: key };
              return (
                <div key={key} className={styles.careItem}>
                  <div className={styles.careLabel}>
                    {meta.icon}
                    {meta.label}
                  </div>
                  <div className={styles.careValue}>{value as string}</div>
                </div>
              );
            })}
          </div>
          {/* Actions */}
          <div className={styles.cardActions}>
            <div className={styles.mainActions}>
              {saved ? (
                <span className={styles.savedBtn}>
                  <IconCheckCircle size={16} /> Saved to History
                </span>
              ) : (
                <button onClick={handleSave} className={styles.saveBtn} id="save-to-history-btn">
                  <IconBookmark size={16} /> Save to History
                </button>
              )}
              {onNewScan && (
                <button onClick={onNewScan} className={styles.newScanBtn} id="new-scan-btn">
                  <IconCamera size={16} /> New Scan
                </button>
              )}
            </div>
            {onDelete && (
              <button 
                className={styles.removeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(result.id);
                }}
              >
                <IconTrash size={14} /> Remove
              </button>
            )}
          </div>
        </>
      )}



      {/* Image Modal / Lightbox */}
      {showImageModal && (imageData || result.imageData) && (
        <div
          className={styles.imageModal}
          onClick={() => setShowImageModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className={styles.closeModal}
            onClick={() => setShowImageModal(false)}
            aria-label="Close image"
          >
            <IconClose size={24} />
          </button>
          <img
            src={imageData || result.imageData}
            alt={result.commonName}
            className={styles.fullImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
