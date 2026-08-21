import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const KEY = 'mb-announcement-dismissed-v1';

/**
 * Dismissal is remembered per browser. Storage access is wrapped because it
 * throws outright in some privacy modes.
 */
export const AnnouncementBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(KEY) !== '1');
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* storage blocked — dismissal just won't persist */
    }
  };

  if (!visible) return null;

  return (
    <div className="relative bg-orange text-white">
      <div className="mx-auto flex max-w-[80rem] items-center justify-center gap-3 px-14 py-2.5 text-center">
        <p className="text-[0.78rem] leading-snug font-500 sm:text-[0.8rem]">
          <span className="font-heading font-700 uppercase tracking-[0.12em]">Season Special</span>
          <span aria-hidden="true" className="mx-2 opacity-50">
            /
          </span>
          Save $150 on your first treatment
          <span className="hidden sm:inline"> plus a free inspection.</span>
        </p>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 grid size-11 cursor-pointer place-items-center rounded-full transition-colors duration-[var(--dur-fast)] hover:bg-white/15"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
