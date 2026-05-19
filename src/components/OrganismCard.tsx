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
  IconSearch, IconClose, IconWarning, IconTrash, IconMushroom,
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
  fungi: <IconMushroom size={14} />,
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
  // Fungi
  toxicity: { icon: <IconWarning size={16} />, label: 'Toxicity' },
  forageable: { icon: <IconCheckCircle size={16} />, label: 'Forageable' },
  season: { icon: <IconClock size={16} />, label: 'Season' },
  lookalikes: { icon: <IconSearch size={16} />, label: 'Lookalikes' },
  preparation: { icon: <IconSliders size={16} />, label: 'Preparation' },
  ecologicalRole: { icon: <IconGlobe size={16} />, label: 'Ecological Role' },
  // Inanimate
  notice: { icon: <IconWarning size={16} />, label: 'Notice' },
};

const FUNGI_LEVELS = [
  { level: 1, name: 'Highly Toxic', emoji: '😵', color: '#e15c5c' },
  { level: 2, name: 'Avoid', emoji: '🙁', color: '#f48c36' },
  { level: 3, name: 'Caution', emoji: '😐', color: '#f4cc36' },
  { level: 4, name: 'Low Risk', emoji: '🙂', color: '#9cd85c' },
  { level: 5, name: 'Safe Choice', emoji: '😊', color: '#5cb85c' },
];

const getSafetyProfile = (toxicity: string = '', forageable: string = '') => {
  const tox = toxicity.toLowerCase();
  const forage = forageable.toLowerCase();

  if (tox.includes('high')) {
    return { level: 1, color: '#e15c5c', label: 'High (Dangerously Toxic)', emoji: '😵' };
  }
  if (tox.includes('medium')) {
    if (forage.includes('no')) {
      return { level: 2, color: '#f48c36', label: 'Medium (Toxic - Avoid)', emoji: '🙁' };
    } else {
      return { level: 3, color: '#f4cc36', label: 'Medium (Caution / Special Prep)', emoji: '😐' };
    }
  }
  if (tox.includes('low') || forage.includes('yes')) {
    if (tox.includes('low') && forage.includes('yes')) {
      return { level: 5, color: '#5cb85c', label: 'Safe / Choice Edible', emoji: '😊' };
    }
    return { level: 4, color: '#9cd85c', label: 'Low Risk / Edible', emoji: '🙂' };
  }
  return { level: 3, color: '#f4cc36', label: 'Medium (Caution)', emoji: '😐' };
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

  const isFungi = result.type === 'fungi';
  const fungiCareInfo = isFungi ? (result.careInfo as any) : null;
  const safetyProfile = isFungi && fungiCareInfo ? getSafetyProfile(fungiCareInfo.toxicity, fungiCareInfo.forageable) : null;

  // Filter out toxicity and forageable from standard care grid if it is Fungi
  const careEntries = Object.entries(result.careInfo || {}).filter(([key]) => {
    if (isFungi && (key === 'toxicity' || key === 'forageable')) {
      return false;
    }
    return true;
  });

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

          {/* Fungi Toxicity & Foraging Safety Profile */}
          {isFungi && safetyProfile && fungiCareInfo && (
            <div className={styles.fungiProfile}>
              <h3 className={styles.fungiProfileTitle}>
                <IconMushroom size={18} /> Safety & Foraging Profile
              </h3>
              
              {/* Emojis matching 5 levels */}
              <div className={styles.emojiRow}>
                {FUNGI_LEVELS.map((levelObj) => {
                  const isActive = levelObj.level === safetyProfile.level;
                  return (
                    <div 
                      key={levelObj.level} 
                      className={`${styles.emojiCol} ${isActive ? styles.emojiColActive : ''}`}
                      style={{ '--accent-color': levelObj.color } as any}
                    >
                      <span className={styles.emojiFace}>{levelObj.emoji}</span>
                      <span className={styles.emojiLabel}>{levelObj.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Gradient Progress Bar */}
              <div className={styles.meterContainer}>
                <span className={styles.meterSignMinus}>−</span>
                <div className={styles.meterTrack}>
                  <div 
                    className={styles.meterPin} 
                    style={{ 
                      left: `${(safetyProfile.level - 1) * 25}%`,
                      backgroundColor: safetyProfile.color
                    }} 
                  />
                </div>
                <span className={styles.meterSignPlus}>+</span>
              </div>

              {/* Descriptions */}
              <div className={styles.safetyInfo}>
                <div className={styles.safetyBox}>
                  <div className={styles.safetyHeader} style={{ color: safetyProfile.color }}>
                    <IconWarning size={16} /> Toxicity: {safetyProfile.label}
                  </div>
                  <p className={styles.safetyText}>{fungiCareInfo.toxicity}</p>
                </div>
                <div className={styles.safetyBox}>
                  <div className={styles.safetyHeader} style={{ color: fungiCareInfo.forageable.toLowerCase().includes('yes') ? 'var(--green-600)' : '#e15c5c' }}>
                    <IconCheckCircle size={16} /> Foraging Status
                  </div>
                  <p className={styles.safetyText}>{fungiCareInfo.forageable}</p>
                </div>
              </div>
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
