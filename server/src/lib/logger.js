const stamp = () => new Date().toISOString();

const write = (level, msg, meta) => {
  const line = `${stamp()} ${level.toUpperCase().padEnd(5)} ${msg}`;
  const out = level === 'error' || level === 'warn' ? console.error : console.log;
  meta ? out(line, meta) : out(line);
};

export const logger = {
  info: (msg, meta) => write('info', msg, meta),
  warn: (msg, meta) => write('warn', msg, meta),
  error: (msg, meta) => write('error', msg, meta),
};
