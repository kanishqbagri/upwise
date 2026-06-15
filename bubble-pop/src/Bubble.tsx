import { useState } from 'react';
import styles from './Bubble.module.css';

export type BubbleData = {
  id: string;
  xPct: number;
  yPct: number;
  size: number;
  hue: number;
  bornAt: number;
};

type Props = {
  data: BubbleData;
  onPop: (id: string) => void;
};

export default function Bubble({ data, onPop }: Props) {
  const [popping, setPopping] = useState(false);

  const handlePop = () => {
    if (popping) return;
    setPopping(true);
    window.setTimeout(() => onPop(data.id), 160);
  };

  return (
    <button
      className={`${styles.bubble} ${popping ? styles.popping : ''}`}
      style={{
        left: `${data.xPct}%`,
        top: `${data.yPct}%`,
        width: data.size,
        height: data.size,
        ['--hue' as string]: data.hue,
      } as React.CSSProperties}
      onClick={handlePop}
      aria-label="Pop bubble"
    />
  );
}
