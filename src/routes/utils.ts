import dayjs from 'dayjs';
import { PageData } from '@/routes/page.loader';

export function openUrl(url: string) {
  window.open(url);
}

export type SortedItem = PageData['statusMap'][string]['recent'] & {
  title: string;
  latestBuildDate?: string;
};

export type SortBy = 'name' | 'health' | 'date';

export function formatDate(text?: string) {
  return text ? dayjs(text).format('YYYY/MM/DD') : 'null';
}

export function getDateColor(text?: string) {
  if (!text) {
    return 'red';
  }
  const d = -dayjs(text).diff(undefined, 'day');
  if (d > 365) {
    return 'red';
  } else if (d > 180) {
    return 'orange';
  } else if (d > 60) {
    return 'gold';
  } else {
    return 'green';
  }
}
