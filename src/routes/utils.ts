import { ListProps } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import getData from '@api/data';
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
  sortBy: SortBy = 'health',
  search?: string,
): ListProps<SortedItem> {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [total, setTotal] = useState(0);
  const [dataSource, setDataSource] = useState<SortedItem[]>([]);

  useEffect(() => {
    getData({
      query: {
        sortBy,
        search,
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    }).then(res => {
      setDataSource(res.list);
      setTotal(res.total);
    });
  }, [sortBy, search, pagination]);

  // console.log('ds', dataSource);
  return {
    dataSource,
    pagination: {
      ...pagination,
      total,
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
