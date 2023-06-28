import { ListProps } from '@arco-design/web-react';
import { useState } from 'react';
import { PageData } from '@/routes/page.loader';

export function openUrl(url: string) {
  window.open(url);
}

export type SortedItem = PageData['statusMap'][string]['recent'] & {
  title: string;
};

export type SortBy = 'name' | 'health';

export function useListProps(
  statusMap: PageData['statusMap'],
  sortBy: SortBy = 'health',
  search?: string,
): ListProps<SortedItem> {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // 生成数组
  let rawArray: SortedItem[] = Object.entries(statusMap).map(
    ([title, item]) => ({
      ...item.recent,
      title,
    }),
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
      return a.title.localeCompare(a.title);
    } else if (sortBy === 'health') {
      return a.health - b.health;
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
