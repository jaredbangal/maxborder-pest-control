import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

// Bump the version whenever the message changes, so people who closed the
// last one still see the new one.
const KEY = 'mb-announcement-dismissed-v2';

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
    <div className="relative border-b border-on-inverse/12 bg-inverse text-on-inverse">
      <div className="flex items-center justify-center gap-2 px-14 py-2.5 text-center">
        <p className="text-[0.78rem] font-500 leading-snug sm:text-[0.8rem]">
          <span className="font-heading font-700 uppercase tracking-[0.12em] text-orange-bright">
            Fall Pest Special
          </span>
          <span aria-hidden="true" className="mx-2 opacity-50">
            /
          </span>
          Rodent Control + Exterior Pest Treatment
          <Link
            to="/#fall-specials"
            className="ml-2 hidden underline underline-offset-4 transition-colors duration-[var(--dur-fast)] hover:text-orange-bright sm:inline"
          >
            See the details
          </Link>
        </p>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute right-3 grid size-11 cursor-pointer place-items-center rounded-full transition-colors duration-[var(--dur-fast)] hover:bg-on-inverse/15"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
