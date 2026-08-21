import { useInView, usePrefersReducedMotion } from '@/hooks';

/**
 * The brand idea, drawn: a house with a treated boundary being established
 * around it. Pure SVG — no image assets, crisp at every size, and it recolours
 * with the theme. The dashed ring draws itself in, then slowly travels.
 */
export const PerimeterGraphic = ({ className }: { className?: string }) => {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });

  const active = inView || reduced;

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 420 420"
        fill="none"
        role="img"
        aria-label="A house enclosed by a treated protective perimeter"
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="mb-roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="210" cy="332" rx="120" ry="12" fill="#12203A" opacity="0.07" />

        {/* Outer perimeter — the defended border.
            The spin lives on the wrapper <g> and the entrance transform on the
            circle, so the two never compete for the same transform property. */}
        <g
          style={{
            transformOrigin: 'center',
            animation: reduced ? undefined : 'mb-spin 60s linear infinite',
          }}
        >
          <circle
            cx="210"
            cy="210"
            r="176"
            stroke="#C2410C"
            strokeWidth="2"
            strokeDasharray="10 12"
            strokeLinecap="round"
            opacity={active ? 0.55 : 0}
            style={{
              transformOrigin: 'center',
              transform: active ? 'scale(1)' : 'scale(0.86)',
              transition: 'opacity 1s var(--ease-out-expo), transform 1.4s var(--ease-out-expo)',
            }}
          />
        </g>

        {/* Inner perimeter, counter-rotating */}
        <g
          style={{
            transformOrigin: 'center',
            animation: reduced ? undefined : 'mb-spin-rev 45s linear infinite',
          }}
        >
          <circle
            cx="210"
            cy="210"
            r="146"
            stroke="#12203A"
            strokeWidth="1.5"
            strokeDasharray="3 9"
            opacity={active ? 0.25 : 0}
            style={{
              transformOrigin: 'center',
              transform: active ? 'scale(1)' : 'scale(0.9)',
              transition:
                'opacity 1s var(--ease-out-expo) 200ms, transform 1.4s var(--ease-out-expo) 200ms',
            }}
          />
        </g>

        {/* Survey corner ticks at the cardinal points */}
        {[
          [210, 20],
          [400, 210],
          [210, 400],
          [20, 210],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill="#C2410C"
            opacity={active ? 1 : 0}
            style={{ transition: `opacity 600ms var(--ease-out-expo) ${500 + i * 90}ms` }}
          />
        ))}

        {/* House */}
        <g
          style={{
            transformOrigin: '210px 240px',
            transform: active ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.94)',
            opacity: active ? 1 : 0,
            transition:
              'opacity 800ms var(--ease-out-expo) 150ms, transform 1s var(--ease-out-expo) 150ms',
          }}
        >
          {/* Body */}
          <path d="M124 196h172v130H124z" fill="#FAF6EC" stroke="#12203A" strokeWidth="4" />
          {/* Roof */}
          <path
            d="M104 200 210 116l106 84z"
            fill="url(#mb-roof)"
            stroke="#12203A"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          {/* Chimney */}
          <path d="M268 138h22v34h-22z" fill="#12203A" />
          {/* Door */}
          <path d="M192 258h36v68h-36z" fill="#12203A" />
          <circle cx="221" cy="292" r="3" fill="#F4EEE0" />
          {/* Windows */}
          <path d="M144 220h38v38h-38z" fill="#12203A" opacity="0.12" stroke="#12203A" strokeWidth="3" />
          <path d="M238 220h38v38h-38z" fill="#12203A" opacity="0.12" stroke="#12203A" strokeWidth="3" />
        </g>

        {/* Shield badge on the boundary */}
        <g
          style={{
            transformOrigin: '330px 100px',
            transform: active ? 'scale(1)' : 'scale(0)',
            transition: 'transform 700ms var(--ease-out-back) 800ms',
          }}
        >
          <circle cx="330" cy="100" r="30" fill="#12203A" />
          <path
            d="M330 85l14 6v10c0 8-6 15-14 18-8-3-14-10-14-18V91z"
            fill="#C2410C"
            stroke="#F4EEE0"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      <style>{`
        @keyframes mb-spin { to { transform: rotate(360deg); } }
        @keyframes mb-spin-rev { to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
};
