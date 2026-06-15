import { useCallback, useEffect, useRef, useState } from 'react';
import Bubble, { type BubbleData } from './Bubble';
import styles from './Game.module.css';

const SPAWN_INTERVAL_MS = 600;
const BUBBLE_LIFETIME_MS = 5200;

function randomBubble(): BubbleData {
  const size = 56 + Math.random() * 96;
  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    xPct: Math.random() * 92 + 4,
    yPct: Math.random() * 80 + 10,
    size,
    hue: 170 + Math.random() * 60,
    bornAt: performance.now(),
  };
}

type Phase = 'playing' | 'ended';

export default function App() {
  const [phase, setPhase] = useState<Phase>('playing');
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing') return;

    const spawn = setInterval(() => {
      if (phaseRef.current !== 'playing') return;
      setBubbles((b) => [...b, randomBubble()]);
    }, SPAWN_INTERVAL_MS);

    const reap = setInterval(() => {
      const now = performance.now();
      setBubbles((b) => b.filter((x) => now - x.bornAt < BUBBLE_LIFETIME_MS));
    }, 500);

    return () => {
      clearInterval(spawn);
      clearInterval(reap);
    };
  }, [phase]);

  const pop = useCallback((id: string) => {
    setBubbles((b) => b.filter((x) => x.id !== id));
    setScore((s) => s + 1);
  }, []);

  const exit = () => setPhase('ended');
  const restart = () => {
    setScore(0);
    setBubbles([]);
    setPhase('playing');
  };

  return (
    <main className={styles.stage}>
      <header className={styles.hud}>
        <div className={styles.brand}>
          <span className={styles.brandDot} />
          <span className={styles.brandText}>BUBBLE / POP</span>
        </div>
        <div className={styles.score} aria-live="polite">
          <span className={styles.scoreLabel}>SCORE</span>
          <span className={styles.scoreValue}>
            {score.toString().padStart(4, '0')}
          </span>
        </div>
        <button
          className={styles.exitBtn}
          onClick={exit}
          disabled={phase !== 'playing'}
          aria-label="Exit game"
        >
          EXIT
        </button>
      </header>

      <section className={styles.field} aria-hidden={phase !== 'playing'}>
        {bubbles.map((b) => (
          <Bubble key={b.id} data={b} onPop={pop} />
        ))}
      </section>

      {phase === 'ended' && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.panel}>
            <div className={styles.panelKicker}>SESSION ENDED</div>
            <div className={styles.panelScore}>{score}</div>
            <div className={styles.panelLabel}>BUBBLES POPPED</div>
            <button className={styles.primaryBtn} onClick={restart}>
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
