import formatDuration from 'date-fns/formatDuration';
import intervalToDuration from 'date-fns/intervalToDuration';
import format from 'date-fns/format';

export const durationShortener = (duration: string) => {
  const shortenDuration = duration
    .replaceAll(' days', 'd')
    .replaceAll(' day', 'd')
    .replaceAll(' hours', 'h')
    .replaceAll(' hour', 'd')
    .replaceAll(' minutes', 'm')
    .replaceAll(' minute', 'm')
    .replaceAll(' seconds', 's')
    .replaceAll(' seconds', 's');

  let durationSplit = shortenDuration.split(' ');

  if (durationSplit.length === 1) {
    return '< a minute';
  } else {
    delete durationSplit[durationSplit.length - 1];
    return durationSplit.join(' ');
  }
};

export const convertToHour12 = (date?: string) => {
  if (!date) {
    return '-';
  }

  return new Date(date).toLocaleString('en-NZ', { hour12: true });
};

// Return interval from start to end date
export const getDateTimeInterval = (startDate: string, endDate: string) => {
  const interval = intervalToDuration({
    start: new Date(startDate),
    end: new Date(endDate),
  });

  const duration = formatDuration(interval, {
    format: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'],
  });

  return duration;
};

// Return date ranges in array of string from start to end date
export const getDatesInRange = (startDate: Date, endDate: Date): string[] => {
  const date = new Date(startDate.getTime());

  date.setDate(date.getDate());

  const dates = [];

  while (date <= endDate) {
    dates.push(format(new Date(date), 'dd/MM/yyyy'));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};
