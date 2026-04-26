'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { OrganismResult } from '@/types';
import { getHistory, removeFromHistory, clearHistory } from '@/lib/storage';
import OrganismCard from '@/components/OrganismCard';
import { 
  IconGlobe, 
  IconLeaf, 
  IconPaw, 
  IconButterfly, 
  IconBird, 
  IconSearch, 
  IconTrash, 
  IconClose 
} from '@/components/Icons';
import styles from './page.module.css';

const FILTER_OPTIONS = [
  { key: 'all', label: 'All', icon: <IconGlobe size={16} />, count: 0 },
  { key: 'plant', label: 'Plants', icon: <IconLeaf size={16} />, count: 0 },
  { key: 'animal', label: 'Animals', icon: <IconPaw size={16} />, count: 0 },
  { key: 'insect', label: 'Insects', icon: <IconButterfly size={16} />, count: 0 },
  { key: 'bird', label: 'Birds', icon: <IconBird size={16} />, count: 0 },
];

export default function HistoryPage() {
  const [history, setHistory] = useState<OrganismResult[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<OrganismResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHistory(getHistory());
  }, []);

  const filtered = filter === 'all'
    ? history
    : history.filter(item => item.type === filter);

  const filterCounts = FILTER_OPTIONS.map(opt => ({
    ...opt,
    count: opt.key === 'all'
      ? history.length
      : history.filter(item => item.type === opt.key).length,
  }));

  const handleDelete = useCallback((id: string) => {
    removeFromHistory(id);
    setHistory(getHistory());
    setSelected(null);
  }, []);

  const handleClearAll = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      clearHistory();
      setHistory([]);
    }
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <h1 className={styles.title}>Identification History</h1>
              <p className={styles.count}>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeFilterIcon = FILTER_OPTIONS.find(o => o.key === filter)?.icon || <IconLeaf size={48} />;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Identification History</h1>
            <p className={styles.count}>
              {history.length} organism{history.length !== 1 ? 's' : ''} identified
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              className={styles.clearBtn}
              id="clear-history-btn"
            >
              <IconTrash size={14} /> Clear All
            </button>
          )}
        </div>

        {/* Filters */}
        {history.length > 0 && (
          <div className={styles.filters}>
            {filterCounts.map(opt => (
              <button
                key={opt.key}
                className={`${styles.filterChip} ${filter === opt.key ? styles.filterActive : ''}`}
                onClick={() => setFilter(opt.key)}
              >
                {opt.icon} {opt.label} ({opt.count})
              </button>
            ))}
          </div>
        )}

        {/* Grid or Empty */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((item, i) => (
              <div key={item.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <OrganismCard
                  result={item}
                  compact
                  onClick={() => setSelected(item)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              {activeFilterIcon}
            </div>
            <h2 className={styles.emptyTitle}>
              {filter === 'all'
                ? 'No identifications yet'
                : `No ${filter}s identified yet`}
            </h2>
            <p className={styles.emptyText}>
              {filter === 'all'
                ? 'Start scanning organisms to build your collection!'
                : `Try identifying a ${filter} to see it appear here.`}
            </p>
            <Link href="/identify" className={styles.emptyLink} id="empty-state-cta">
              <IconSearch size={18} /> Start Identifying
            </Link>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <button
            className={styles.modalClose}
            onClick={() => setSelected(null)}
            aria-label="Close detail view"
            id="close-modal-btn"
          >
            <IconClose size={20} />
          </button>
          <div className={styles.modalContent}>
            <OrganismCard result={selected} />
            <button
              onClick={() => handleDelete(selected.id)}
              className={styles.deleteBtn}
              id="delete-entry-btn"
            >
              <IconTrash size={14} /> Remove from History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
