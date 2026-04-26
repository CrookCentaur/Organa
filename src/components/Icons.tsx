/**
 * Custom SVG Icon components matching the Organa iconography sheet.
 * Style: dual-tone — dark outlines (#1A2E1A) with green (#3DA35D) accents.
 * Consistent 24x24 viewBox, 2px stroke, rounded caps/joins.
 */

interface IconProps {
  size?: number;
  className?: string;
}

const D = '#1A2E1A'; // dark outline color
const A = '#3DA35D'; // green accent color

export function IconSearch({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" stroke={D} strokeWidth="2" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" stroke={A} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconCamera({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 7C3 5.9 3.9 5 5 5H7L9 3H15L17 5H19C20.1 5 21 5.9 21 7V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V7Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="12.5" r="3.5" stroke={A} strokeWidth="2" />
    </svg>
  );
}

export function IconUpload({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 16V4" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 8L12 4L16 8" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 14V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V14" stroke={D} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLeaf({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3C12 3 5 10 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 10 12 3 12 3Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 10V18" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 14L9 17" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12L15 15" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconPaw({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <ellipse cx="7" cy="8" rx="2" ry="2.5" stroke={D} strokeWidth="1.8" />
      <ellipse cx="17" cy="8" rx="2" ry="2.5" stroke={D} strokeWidth="1.8" />
      <ellipse cx="4.5" cy="13" rx="1.8" ry="2.2" stroke={D} strokeWidth="1.8" />
      <ellipse cx="19.5" cy="13" rx="1.8" ry="2.2" stroke={D} strokeWidth="1.8" />
      <path d="M8.5 16C8.5 16 9.5 20 12 20C14.5 20 15.5 16 15.5 16C15.5 14 14 13 12 13C10 13 8.5 14 8.5 16Z" stroke={A} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function IconButterfly({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5V20" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8C12 8 5 5 4 9C3 13 8 14 12 12" stroke={D} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 8C12 8 19 5 20 9C21 13 16 14 12 12" stroke={A} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 14C12 14 7 14 6 17C5 20 9 19 12 17" stroke={D} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 14C12 14 17 14 18 17C19 20 15 19 12 17" stroke={A} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="10" cy="3.5" r="0.5" fill={D} />
      <circle cx="14" cy="3.5" r="0.5" fill={A} />
      <line x1="10" y1="4" x2="11.5" y2="5.5" stroke={D} strokeWidth="1" strokeLinecap="round" />
      <line x1="14" y1="4" x2="12.5" y2="5.5" stroke={A} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function IconBird({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M18 8C18 8 21 6 22 4C20 5 18 5.5 18 5.5" stroke={A} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16C4 16 3 11 7 8C11 5 15 6 18 8C18 8 19 12 17 15C15 18 10 19 7 18L4 21V16Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="14" cy="10" r="1" fill={A} />
    </svg>
  );
}

export function IconDocument({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 3H14L20 9V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V5C4 3.9 4.9 3 6 3Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 3V9H20" stroke={A} strokeWidth="2" strokeLinejoin="round" />
      <line x1="8" y1="13" x2="16" y2="13" stroke={D} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="8" y1="16" x2="13" y2="16" stroke={D} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function IconDNA({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 2V6C7 9.31 9.69 12 13 12H17" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 22V18C17 14.69 14.31 12 11 12H7" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <circle cx="7" cy="2" r="1.5" fill={D} />
      <circle cx="17" cy="22" r="1.5" fill={A} />
      <line x1="9" y1="6" x2="13" y2="6" stroke={D} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="18" x2="15" y2="18" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconClock({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={D} strokeWidth="2" />
      <path d="M12 7V12L15.5 14" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHeart({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 20L4.5 12.5C2.5 10.5 2.5 7 4.5 5C6.5 3 10 3 12 5.5C14 3 17.5 3 19.5 5C21.5 7 21.5 10.5 19.5 12.5L12 20Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 8C13.5 5 16.5 5 18 6.5" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconBookmark({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 3H19V21L12 16L5 21V3Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 8H15" stroke={A} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconTrash({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 7H19L18 20C18 20.55 17.55 21 17 21H7C6.45 21 6 20.55 6 20L5 7Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <line x1="3" y1="7" x2="21" y2="7" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <path d="M9 3H15" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="11" x2="10" y2="17" stroke={D} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="14" y1="11" x2="14" y2="17" stroke={D} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function IconClose({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="6" x2="6" y2="18" stroke={D} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconRefresh({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12C4 7.58 7.58 4 12 4C15 4 17.6 5.64 19 8" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <path d="M20 12C20 16.42 16.42 20 12 20C9 20 6.4 18.36 5 16" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 8H20V4" stroke={D} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 16H4V20" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowRight({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <path d="M15 7L20 12L15 17" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPin({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21C12 21 5 14.5 5 9.5C5 5.36 8.13 2 12 2C15.87 2 19 5.36 19 9.5C19 14.5 12 21 12 21Z" stroke={D} strokeWidth="2" />
      <circle cx="12" cy="9.5" r="2.5" stroke={A} strokeWidth="2" />
    </svg>
  );
}

export function IconLightbulb({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 21H15" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 18H14" stroke={D} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 6V10" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 8H14" stroke={A} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconSliders({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="12" x2="20" y2="12" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="18" x2="20" y2="18" stroke={D} strokeWidth="2" strokeLinecap="round" />
      <circle cx="8" cy="6" r="2" fill="white" stroke={A} strokeWidth="2" />
      <circle cx="16" cy="12" r="2" fill="white" stroke={A} strokeWidth="2" />
      <circle cx="10" cy="18" r="2" fill="white" stroke={A} strokeWidth="2" />
    </svg>
  );
}

export function IconCheckCircle({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={D} strokeWidth="2" />
      <path d="M8 12L11 15L16 9" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconWarning({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3L2 21H22L12 3Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <line x1="12" y1="10" x2="12" y2="14" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1" fill={A} />
    </svg>
  );
}

// Organism-type specific care icons
export function IconDroplet({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3C12 3 6 10 6 14.5C6 17.81 8.69 20.5 12 20.5C15.31 20.5 18 17.81 18 14.5C18 10 12 3 12 3Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 14C10 14 10 16 12 16" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconSun({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke={D} strokeWidth="2" />
      <line x1="12" y1="2" x2="12" y2="5" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="19" x2="12" y2="22" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="12" x2="5" y2="12" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <line x1="19" y1="12" x2="22" y2="12" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke={A} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconScissors({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="6" cy="6" r="3" stroke={D} strokeWidth="2" />
      <circle cx="6" cy="18" r="3" stroke={D} strokeWidth="2" />
      <line x1="8.5" y1="7.5" x2="20" y2="17" stroke={A} strokeWidth="2" strokeLinecap="round" />
      <line x1="8.5" y1="16.5" x2="20" y2="7" stroke={A} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconShield({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3L4 7V12C4 16.42 7.4 20.52 12 21.5C16.6 20.52 20 16.42 20 12V7L12 3Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHome({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 10L12 3L21 10V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V10Z" stroke={D} strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 21V14H15V21" stroke={A} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGlobe({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke={D} strokeWidth="2" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke={A} strokeWidth="1.5" />
      <line x1="3" y1="12" x2="21" y2="12" stroke={D} strokeWidth="1.5" />
    </svg>
  );
}
