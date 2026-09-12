"use client";

import { useId } from "react";

export type PictoId =
  | "faro"
  | "manzana"
  | "luna"
  | "pez"
  | "casa"
  | "flor"
  | "barco"
  | "buho"
  | "pera"
  | "naranja"
  | "limon"
  | "fresa"
  | "sol"
  | "estrella"
  | "arbol"
  | "bici"
  | "zorro"
  | "pajaro"
  | "hongo"
  | "rana"
  | "cama"
  | "zapato"
  | "puerta"
  | "lluvia"
  | "paraguas"
  | "caminar"
  | "huevo"
  | "sarten"
  | "plato"
  | "sonrisa"
  | "circulo"
  | "cuadrado"
  | "triangulo"
  | "piedra"
  | "luciernaga"
  | "hoja"
  | "semilla"
  | "cristal"
  | "amigo"
  | "hongo2"
  | "arbusto"
  | "techo"
  | "puertaCasa"
  | "ventana";

function lighten(hex: string, amt = 40) {
  const { r, g, b } = toRgb(hex);
  return toHex(r + amt, g + amt, b + amt);
}
function darken(hex: string, amt = 36) {
  const { r, g, b } = toRgb(hex);
  return toHex(r - amt, g - amt, b - amt);
}
function toRgb(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function toHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function Picto({ id, size = 56, color }: { id: PictoId; size?: number; color?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} aria-hidden>
      <defs>
        <filter id={`p-${uid}`} x="-28%" y="-22%" width="156%" height="168%">
          <feDropShadow dx="0" dy="3.5" stdDeviation="2.4" floodColor="#1a2744" floodOpacity="0.26" />
        </filter>
        <radialGradient id={`shine-${uid}`} cx="30%" cy="24%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        {volumeDefs(id, uid, color)}
      </defs>
      <g filter={`url(#p-${uid})`}>{draw(id, uid, color)}</g>
    </svg>
  );
}

function volumeDefs(id: PictoId, uid: string, color?: string) {
  const base = color ?? "#d27a5a";
  return (
    <>
      <radialGradient id={`${uid}-vol`} cx="32%" cy="28%" r="78%">
        <stop offset="0%" stopColor={lighten(base, 52)} />
        <stop offset="48%" stopColor={base} />
        <stop offset="100%" stopColor={darken(base, 42)} />
      </radialGradient>
      <radialGradient id={`${uid}-red`} cx="32%" cy="28%" r="78%">
        <stop offset="0%" stopColor="#f2a888" />
        <stop offset="50%" stopColor="#d26a4a" />
        <stop offset="100%" stopColor="#8a3a2a" />
      </radialGradient>
      <radialGradient id={`${uid}-gold`} cx="32%" cy="28%" r="78%">
        <stop offset="0%" stopColor="#fff0b0" />
        <stop offset="46%" stopColor="#e6b567" />
        <stop offset="100%" stopColor="#b07a28" />
      </radialGradient>
      <radialGradient id={`${uid}-green`} cx="34%" cy="28%" r="78%">
        <stop offset="0%" stopColor="#b5d68a" />
        <stop offset="50%" stopColor="#5b8a52" />
        <stop offset="100%" stopColor="#2f5538" />
      </radialGradient>
      <radialGradient id={`${uid}-leaf`} cx="34%" cy="28%" r="78%">
        <stop offset="0%" stopColor="#9ec484" />
        <stop offset="100%" stopColor="#355545" />
      </radialGradient>
      <radialGradient id={`${uid}-blue`} cx="32%" cy="28%" r="78%">
        <stop offset="0%" stopColor="#8ec4e0" />
        <stop offset="50%" stopColor="#3d7ea8" />
        <stop offset="100%" stopColor="#1f4668" />
      </radialGradient>
      <radialGradient id={`${uid}-wood`} cx="30%" cy="25%" r="80%">
        <stop offset="0%" stopColor="#d4a06a" />
        <stop offset="50%" stopColor="#8a5a3b" />
        <stop offset="100%" stopColor="#5a3420" />
      </radialGradient>
      <radialGradient id={`${uid}-cream`} cx="32%" cy="26%" r="78%">
        <stop offset="0%" stopColor="#fffaf0" />
        <stop offset="55%" stopColor="#f3d7a4" />
        <stop offset="100%" stopColor="#c89a62" />
      </radialGradient>
      <radialGradient id={`${uid}-orange`} cx="32%" cy="28%" r="78%">
        <stop offset="0%" stopColor="#f6c27a" />
        <stop offset="50%" stopColor="#d4923c" />
        <stop offset="100%" stopColor="#8a5418" />
      </radialGradient>
      <radialGradient id={`${uid}-stone`} cx="32%" cy="28%" r="78%">
        <stop offset="0%" stopColor="#c8cdd4" />
        <stop offset="50%" stopColor="#7a828c" />
        <stop offset="100%" stopColor="#4a5160" />
      </radialGradient>
      <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color ?? "#f4e287"} stopOpacity="0.85" />
        <stop offset="100%" stopColor={color ?? "#f4e287"} stopOpacity="0" />
      </radialGradient>
    </>
  );
}

function draw(id: PictoId, uid: string, color?: string) {
  const shine = `url(#shine-${uid})`;
  switch (id) {
    case "faro":
      return (
        <>
          <path d="M26 64 h28 l5 10 H21 z" fill={`url(#${uid}-wood)`} />
          <rect x="34" y="24" width="12" height="40" rx="3" fill={`url(#${uid}-cream)`} />
          <rect x="36" y="30" width="8" height="6" fill="#d27a5a" opacity="0.35" />
          <rect x="36" y="42" width="8" height="6" fill="#d27a5a" opacity="0.35" />
          <rect x="30" y="14" width="20" height="12" rx="3" fill={`url(#${uid}-gold)`} />
          <circle cx="40" cy="20" r="4.2" fill="#fff8ea" />
          <circle cx="40" cy="20" r="10" fill={`url(#${uid}-glow)`} opacity="0.4" />
          <path d="M40 6 L47 16 H33 z" fill={`url(#${uid}-red)`} />
          <ellipse cx="32" cy="18" rx="6" ry="3" fill={shine} />
        </>
      );
    case "manzana":
      return (
        <>
          <path d="M40 22 C22 22 20 50 28 64 C34 72 46 72 52 64 C60 50 58 22 40 22 Z" fill={`url(#${uid}-red)`} />
          <path d="M40 22 C36 12 48 10 50 20" stroke="#3f6d4d" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <ellipse cx="31" cy="40" rx="6" ry="9" fill={shine} />
        </>
      );
    case "luna":
      return (
        <>
          <path d="M48 12 A28 28 0 1 0 48 68 A22 22 0 1 1 48 12 Z" fill={`url(#${uid}-gold)`} />
          <circle cx="36" cy="34" r="3.2" fill="#c4893a" opacity="0.28" />
          <circle cx="42" cy="48" r="2.2" fill="#c4893a" opacity="0.22" />
          <ellipse cx="34" cy="28" rx="7" ry="5" fill={shine} />
        </>
      );
    case "pez":
      return (
        <>
          <ellipse cx="38" cy="40" rx="20" ry="13" fill={`url(#${uid}-blue)`} />
          <path d="M56 40 L73 26 V54 Z" fill="#2a5478" />
          <path d="M34 30 Q42 40 34 50" stroke="#fff8ea" strokeWidth="2" fill="none" opacity="0.35" />
          <circle cx="30" cy="36" r="3.2" fill="#1a2744" />
          <circle cx="31.2" cy="35" r="1" fill="#fff" />
          <ellipse cx="30" cy="34" rx="7" ry="4" fill={shine} />
        </>
      );
    case "casa":
      return (
        <>
          <path d="M12 42 L40 16 L68 42 V68 H12 Z" fill={`url(#${uid}-cream)`} />
          <path d="M12 42 L40 16 L68 42" fill={`url(#${uid}-red)`} />
          <rect x="34" y="46" width="12" height="22" rx="2" fill={`url(#${uid}-wood)`} />
          <circle cx="43" cy="58" r="1.6" fill="#f0c56a" />
          <rect x="18" y="48" width="10" height="10" rx="2" fill={`url(#${uid}-blue)`} />
          <ellipse cx="28" cy="28" rx="8" ry="4" fill={shine} />
        </>
      );
    case "flor":
      return (
        <>
          <rect x="38" y="50" width="4" height="18" rx="2" fill={`url(#${uid}-leaf)`} />
          {[[40, 24], [26, 34], [54, 34], [30, 50], [50, 50]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="8.5" fill={`url(#${uid}-red)`} />
          ))}
          <circle cx="40" cy="38" r="7" fill={`url(#${uid}-gold)`} />
          <ellipse cx="32" cy="30" rx="5" ry="3" fill={shine} />
        </>
      );
    case "barco":
      return (
        <>
          <path d="M16 48 H64 L56 66 H24 Z" fill={`url(#${uid}-wood)`} />
          <path d="M40 14 V48 H60 Z" fill={`url(#${uid}-cream)`} />
          <rect x="38" y="14" width="4" height="36" rx="1" fill={`url(#${uid}-leaf)`} />
          <ellipse cx="34" cy="22" rx="6" ry="3" fill={shine} />
        </>
      );
    case "buho":
      return (
        <>
          <ellipse cx="40" cy="46" rx="18" ry="20" fill={`url(#${uid}-wood)`} />
          <ellipse cx="40" cy="40" rx="13" ry="10" fill="#c4893a" opacity="0.28" />
          <circle cx="32" cy="40" r="8" fill="#fff8ea" />
          <circle cx="48" cy="40" r="8" fill="#fff8ea" />
          <circle cx="32" cy="41" r="3.1" fill="#1a2744" />
          <circle cx="48" cy="41" r="3.1" fill="#1a2744" />
          <circle cx="33.4" cy="39.6" r="1.1" fill="#fff" />
          <path d="M36 50 L40 57 L44 50" fill={`url(#${uid}-gold)`} />
        </>
      );
    case "pera":
      return (
        <>
          <path d="M40 20 C28 28 24 50 32 64 C38 72 42 72 48 64 C56 50 52 28 40 20 Z" fill={`url(#${uid}-green)`} />
          <path d="M40 18 C38 10 46 10 46 18" stroke="#3f6d4d" strokeWidth="3" fill="none" />
          <ellipse cx="33" cy="36" rx="5" ry="8" fill={shine} />
        </>
      );
    case "naranja":
      return (
        <>
          <circle cx="40" cy="42" r="22" fill={`url(#${uid}-orange)`} />
          <path d="M40 22 C36 32 36 52 40 62" stroke="#c4893a" strokeWidth="1.4" opacity="0.35" fill="none" />
          <ellipse cx="30" cy="34" rx="7" ry="5" fill={shine} />
        </>
      );
    case "limon":
      return (
        <>
          <ellipse cx="40" cy="42" rx="16" ry="22" fill={`url(#${uid}-gold)`} transform="rotate(-20 40 42)" />
          <ellipse cx="32" cy="34" rx="5" ry="7" fill={shine} transform="rotate(-20 32 34)" />
        </>
      );
    case "fresa":
      return (
        <>
          <path d="M40 18 C22 28 20 52 40 68 C60 52 58 28 40 18 Z" fill={`url(#${uid}-red)`} />
          <path d="M28 20 H52 L40 9 Z" fill={`url(#${uid}-leaf)`} />
          <circle cx="34" cy="40" r="1.4" fill="#fff6d2" opacity="0.7" />
          <circle cx="46" cy="46" r="1.4" fill="#fff6d2" opacity="0.7" />
          <circle cx="38" cy="54" r="1.2" fill="#fff6d2" opacity="0.55" />
          <ellipse cx="32" cy="34" rx="5" ry="4" fill={shine} />
        </>
      );
    case "sol":
      return (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect key={deg} x="38" y="6" width="4" height="12" rx="2" fill="#e6b567" transform={`rotate(${deg} 40 40)`} />
          ))}
          <circle cx="40" cy="40" r="15" fill={`url(#${uid}-gold)`} />
          <ellipse cx="33" cy="34" rx="6" ry="4" fill={shine} />
        </>
      );
    case "estrella":
      return (
        <>
          <path d="M40 8 L48 30 H72 L52 44 L60 68 L40 54 L20 68 L28 44 L8 30 H32 Z" fill={`url(#${uid}-gold)`} />
          <ellipse cx="36" cy="28" rx="6" ry="4" fill={shine} />
        </>
      );
    case "arbol":
      return (
        <>
          <ellipse cx="40" cy="72" rx="14" ry="3" fill="#1a2744" opacity="0.16" />
          <rect x="35" y="46" width="10" height="24" rx="3" fill={`url(#${uid}-wood)`} />
          <circle cx="40" cy="30" r="18" fill={`url(#${uid}-green)`} />
          <circle cx="26" cy="38" r="12" fill={`url(#${uid}-leaf)`} />
          <circle cx="54" cy="38" r="11" fill="#7ea072" />
          <circle cx="40" cy="22" r="10" fill="#9ec46a" opacity="0.55" />
          <ellipse cx="30" cy="24" rx="7" ry="4" fill={shine} />
        </>
      );
    case "bici":
      return (
        <>
          <circle cx="24" cy="52" r="12" fill="none" stroke={`url(#${uid}-wood)`} strokeWidth="4.2" />
          <circle cx="58" cy="52" r="12" fill="none" stroke={`url(#${uid}-wood)`} strokeWidth="4.2" />
          <path d="M24 52 L40 26 H54 L58 52 M40 26 L36 52" stroke={`url(#${uid}-orange)`} strokeWidth="4" fill="none" strokeLinejoin="round" />
        </>
      );
    case "zorro":
      return (
        <>
          <ellipse cx="42" cy="50" rx="18" ry="14" fill={`url(#${uid}-orange)`} />
          <path d="M26 38 L32 18 L40 38" fill={`url(#${uid}-orange)`} />
          <path d="M44 38 L52 18 L58 38" fill={`url(#${uid}-orange)`} />
          <ellipse cx="44" cy="52" rx="8" ry="5" fill="#fff8ea" opacity="0.45" />
          <circle cx="38" cy="48" r="2.2" fill="#1a2744" />
          <circle cx="50" cy="48" r="2.2" fill="#1a2744" />
          <circle cx="39" cy="47" r="0.7" fill="#fff" />
        </>
      );
    case "pajaro":
      return (
        <>
          <ellipse cx="40" cy="42" rx="16" ry="11" fill={`url(#${uid}-blue)`} />
          <path d="M24 42 Q14 26 34 36" fill="#2a5478" />
          <circle cx="50" cy="40" r="2.2" fill="#1a2744" />
          <path d="M54 42 L62 38 L54 46 Z" fill={`url(#${uid}-gold)`} />
          <ellipse cx="34" cy="36" rx="6" ry="3" fill={shine} />
        </>
      );
    case "hongo":
    case "hongo2":
      return (
        <>
          <path d="M20 40 A20 16 0 0 1 60 40 H20 Z" fill={id === "hongo2" ? `url(#${uid}-green)` : `url(#${uid}-red)`} />
          <circle cx="30" cy="34" r="3" fill="#fff8ea" opacity="0.7" />
          <circle cx="46" cy="32" r="2.4" fill="#fff8ea" opacity="0.6" />
          <rect x="34" y="40" width="12" height="20" rx="5" fill={`url(#${uid}-cream)`} />
        </>
      );
    case "rana":
      return (
        <>
          <ellipse cx="40" cy="48" rx="20" ry="14" fill={`url(#${uid}-green)`} />
          <ellipse cx="40" cy="46" rx="11" ry="6" fill="#9ec46a" opacity="0.4" />
          <circle cx="28" cy="34" r="8" fill={`url(#${uid}-green)`} />
          <circle cx="52" cy="34" r="8" fill={`url(#${uid}-green)`} />
          <circle cx="28" cy="34" r="3.1" fill="#1a2744" />
          <circle cx="52" cy="34" r="3.1" fill="#1a2744" />
          <circle cx="29.3" cy="32.8" r="1" fill="#fff" />
        </>
      );
    case "cama":
      return (
        <>
          <rect x="12" y="40" width="56" height="18" rx="5" fill={`url(#${uid}-blue)`} />
          <rect x="16" y="26" width="18" height="16" rx="4" fill={`url(#${uid}-cream)`} />
          <rect x="12" y="56" width="6" height="10" rx="1" fill={`url(#${uid}-wood)`} />
          <rect x="62" y="56" width="6" height="10" rx="1" fill={`url(#${uid}-wood)`} />
          <ellipse cx="22" cy="32" rx="5" ry="3" fill={shine} />
        </>
      );
    case "zapato":
      return (
        <>
          <path d="M14 48 H46 C62 48 66 34 71 34 V58 H14 Z" fill={`url(#${uid}-blue)`} />
          <ellipse cx="28" cy="44" rx="8" ry="4" fill={shine} />
        </>
      );
    case "puerta":
    case "puertaCasa":
      return (
        <>
          <rect x="24" y="14" width="32" height="52" rx="5" fill={`url(#${uid}-wood)`} />
          <rect x="28" y="20" width="10" height="14" rx="2" fill="#5a3420" opacity="0.25" />
          <circle cx="48" cy="42" r="3.2" fill={`url(#${uid}-gold)`} />
          <ellipse cx="30" cy="24" rx="6" ry="4" fill={shine} />
        </>
      );
    case "lluvia":
      return (
        <>
          <ellipse cx="40" cy="28" rx="20" ry="13" fill={`url(#${uid}-blue)`} />
          <ellipse cx="28" cy="30" rx="10" ry="8" fill="#7aa0b8" />
          <path d="M28 44 l-4 16 M40 46 l-4 18 M52 44 l-4 16" stroke="#3d7ea8" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="32" cy="22" rx="7" ry="4" fill={shine} />
        </>
      );
    case "paraguas":
      return (
        <>
          <path d="M14 42 A26 26 0 0 1 66 42 Z" fill="#5b4e8a" />
          <path d="M14 42 A26 26 0 0 1 66 42 Z" fill={`url(#${uid}-vol)`} opacity="0.35" />
          <path d="M40 42 V64 Q46 71 53 64" stroke="#1a2744" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <ellipse cx="28" cy="30" rx="8" ry="4" fill={shine} />
        </>
      );
    case "caminar":
      return (
        <>
          <circle cx="44" cy="18" r="8" fill={`url(#${uid}-cream)`} />
          <path d="M44 26 L40 46 L28 64 M40 46 L56 44 L63 62 M36 36 L52 34" stroke="#1a2744" strokeWidth="4.2" fill="none" strokeLinecap="round" />
        </>
      );
    case "huevo":
      return (
        <>
          <ellipse cx="40" cy="42" rx="15" ry="21" fill={`url(#${uid}-cream)`} />
          <ellipse cx="33" cy="34" rx="6" ry="8" fill={shine} />
        </>
      );
    case "sarten":
      return (
        <>
          <circle cx="34" cy="42" r="18" fill="#4a3c3a" />
          <circle cx="34" cy="42" r="13" fill="#2a2220" />
          <rect x="50" y="38" width="22" height="8" rx="4" fill={`url(#${uid}-wood)`} />
          <ellipse cx="30" cy="38" rx="7" ry="4" fill={`url(#${uid}-gold)`} opacity="0.7" />
        </>
      );
    case "plato":
      return (
        <>
          <ellipse cx="40" cy="42" rx="26" ry="12" fill={`url(#${uid}-cream)`} />
          <ellipse cx="40" cy="42" rx="16" ry="6" fill="#fff8ea" />
        </>
      );
    case "sonrisa":
      return (
        <>
          <circle cx="40" cy="40" r="22" fill={`url(#${uid}-gold)`} />
          <circle cx="32" cy="34" r="3.2" fill="#1a2744" />
          <circle cx="48" cy="34" r="3.2" fill="#1a2744" />
          <circle cx="33.2" cy="32.8" r="1" fill="#fff" />
          <path d="M28 46 Q40 60 52 46" stroke="#1a2744" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <ellipse cx="32" cy="30" rx="7" ry="4" fill={shine} />
        </>
      );
    case "circulo":
      return (
        <>
          <circle cx="40" cy="40" r="21" fill={`url(#${uid}-vol)`} />
          <ellipse cx="30" cy="30" rx="8" ry="5" fill={shine} />
        </>
      );
    case "cuadrado":
      return (
        <>
          <rect x="17" y="17" width="46" height="46" rx="10" fill={`url(#${uid}-vol)`} />
          <ellipse cx="30" cy="28" rx="8" ry="5" fill={shine} />
        </>
      );
    case "triangulo":
      return (
        <>
          <path d="M40 14 L68 64 H12 Z" fill={`url(#${uid}-vol)`} />
          <ellipse cx="36" cy="36" rx="7" ry="4" fill={shine} />
        </>
      );
    case "piedra":
      return (
        <>
          <ellipse cx="40" cy="46" rx="23" ry="15" fill={`url(#${uid}-stone)`} />
          <ellipse cx="32" cy="40" rx="8" ry="5" fill={shine} />
        </>
      );
    case "luciernaga":
      return (
        <>
          <circle cx="40" cy="40" r="20" fill={`url(#${uid}-glow)`} />
          <circle cx="40" cy="40" r="9" fill={`url(#${uid}-gold)`} />
          <ellipse cx="36" cy="36" rx="4" ry="3" fill={shine} />
        </>
      );
    case "hoja":
      return (
        <>
          <path d="M40 10 C18 28 16 52 40 72 C64 52 62 28 40 10 Z" fill={`url(#${uid}-leaf)`} />
          <path d="M40 16 C40 36 40 56 40 68" stroke="#2f5538" strokeWidth="1.6" opacity="0.45" />
          <ellipse cx="32" cy="32" rx="6" ry="8" fill={shine} />
        </>
      );
    case "semilla":
      return (
        <>
          <ellipse cx="40" cy="50" rx="11" ry="16" fill={`url(#${uid}-wood)`} />
          <path d="M40 36 C43 18 56 16 56 28 C50 30 44 38 40 36" fill={`url(#${uid}-leaf)`} />
          <ellipse cx="36" cy="44" rx="4" ry="6" fill={shine} />
        </>
      );
    case "cristal":
      return (
        <>
          <circle cx="40" cy="42" r="22" fill={`url(#${uid}-glow)`} opacity="0.55" />
          <path d="M40 10 L60 30 L50 70 H30 L20 30 Z" fill={color ? `url(#${uid}-vol)` : `url(#${uid}-green)`} />
          <path d="M40 14 L52 30 L46 64 H40 Z" fill="#fff" opacity="0.18" />
          <ellipse cx="34" cy="28" rx="5" ry="7" fill={shine} />
        </>
      );
    case "amigo":
      return (
        <>
          <circle cx="40" cy="46" r="20" fill={`url(#${uid}-cream)`} />
          <circle cx="33" cy="42" r="3.1" fill="#1a2744" />
          <circle cx="47" cy="42" r="3.1" fill="#1a2744" />
          <circle cx="34.2" cy="40.8" r="1" fill="#fff" />
          <path d="M32 52 Q40 60 48 52" stroke="#c4893a" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <ellipse cx="30" cy="54" rx="5" ry="3.5" fill="#e89b78" opacity="0.45" />
          <path d="M40 16 C35 6 52 4 54 16 C48 22 42 22 40 16" fill={`url(#${uid}-leaf)`} />
          <ellipse cx="32" cy="36" rx="6" ry="4" fill={shine} />
        </>
      );
    case "arbusto":
      return (
        <>
          <circle cx="28" cy="50" r="13" fill={`url(#${uid}-green)`} />
          <circle cx="44" cy="42" r="15" fill={`url(#${uid}-leaf)`} />
          <circle cx="56" cy="52" r="12" fill="#7ea072" />
          <ellipse cx="36" cy="36" rx="7" ry="4" fill={shine} />
        </>
      );
    case "techo":
      return (
        <>
          <path d="M8 50 L40 14 L72 50 Z" fill={`url(#${uid}-red)`} />
          <path d="M18 44 L40 22 L48 30" stroke="#fff8ea" strokeWidth="3" opacity="0.25" fill="none" />
        </>
      );
    case "ventana":
      return (
        <>
          <rect x="18" y="18" width="44" height="44" rx="8" fill={`url(#${uid}-wood)`} />
          <rect x="22" y="22" width="16" height="16" rx="2" fill={`url(#${uid}-blue)`} />
          <rect x="42" y="22" width="16" height="16" rx="2" fill={`url(#${uid}-blue)`} />
          <rect x="22" y="42" width="16" height="16" rx="2" fill={`url(#${uid}-blue)`} />
          <rect x="42" y="42" width="16" height="16" rx="2" fill={`url(#${uid}-blue)`} />
          <ellipse cx="26" cy="26" rx="4" ry="3" fill={shine} />
        </>
      );
    default:
      return <circle cx="40" cy="40" r="16" fill={`url(#${uid}-orange)`} />;
  }
}

export const SHAPE_COLOR: Record<string, string> = {
  rojo: "#d26a4a",
  azul: "#3d7ea8",
  amarillo: "#e6b567",
};
