import { ListProps } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { PageData } from '@/routes/page.loader';

export function openUrl(url: string) {
  window.open(url);
}

export type SortedItem = PageData['statusMap'][string]['recent'] & {
  title: string;
  latestBuildDate?: string;
};

export type SortBy = 'name' | 'health' | 'date';

export function useListProps(
  statusMap: PageData['statusMap'],
  sortBy: SortBy = 'health',
  search?: string,
): ListProps<SortedItem> {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // 生成数组
  let rawArray: SortedItem[] = Object.entries(statusMap).map(
    ([title, item]) => {
      const recentBuild = item.recent.builds.find(
        build => build.version === item.recent.latestVersion,
      );
      return {
        ...item.recent,
        title,
        latestBuildDate: formatDate(recentBuild?.timestamp),
      };
    },
  );

  // 搜索
  if (search) {
    rawArray = rawArray.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // 排序
  rawArray.sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'health') {
      return a.health - b.health;
    } else if (sortBy === 'date') {
      return dayjs(b.latestBuildDate).diff(dayjs(a.latestBuildDate));
    }
    return 0;
  });

  // 分页
  const startIndex = (pagination.current - 1) * pagination.pageSize;
  const dataSource = rawArray.slice(
    startIndex,
    Math.min(startIndex + pagination.pageSize, rawArray.length),
  );

  return {
    dataSource,
    pagination: {
      ...pagination,
      total: rawArray.length,
      showTotal: true,
      sizeCanChange: true,
      onChange: (current, pageSize) => setPagination({ current, pageSize }),
      style: { marginRight: '24px' },
    },
  };
}

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
