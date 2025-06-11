export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00.000Z');
};

export const isToday = (dateString: string): boolean => {
  const today = formatDate(new Date());
  return dateString === today;
};

export const isYesterday = (dateString: string): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === formatDate(yesterday);
};

export const getDaysDifference = (date1: string, date2: string): number => {
  const d1 = parseDate(date1);
  const d2 = parseDate(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};