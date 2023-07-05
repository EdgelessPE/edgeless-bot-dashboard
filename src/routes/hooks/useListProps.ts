import { ListProps } from '@arco-design/web-react';
import dayjs from 'dayjs';
import { URLParams } from '@/routes/hooks/types';
import { PageData } from '@/routes/page.loader';
import { formatDate, SortedItem } from '@/routes/utils';

export function useListProps(
  statusMap: PageData['statusMap'],
  params: URLParams,
  setParams: (newVal: URLParams | ((val: URLParams) => URLParams)) => void,
): ListProps<SortedItem> {
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
  const { search } = params;
  if (search) {
    rawArray = rawArray.filter(item =>
      item.title.toLowerCase().includes(String(search).toLowerCase()),
    );
  }

  // 排序
  rawArray.sort((a, b) => {
    if (params.sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (params.sortBy === 'health') {
      return a.health - b.health;
    } else if (params.sortBy === 'date') {
      return dayjs(b.latestBuildDate).diff(dayjs(a.latestBuildDate));
    }
    return 0;
  });

  // 分页
  let startIndex = (params.current - 1) * params.pageSize;
  if (startIndex >= rawArray.length) {
    startIndex = Math.ceil(rawArray.length / params.pageSize);
  }
  const dataSource = rawArray.slice(
    startIndex,
    Math.min(startIndex + params.pageSize, rawArray.length),
  );

  return {
    dataSource,
    pagination: {
      ...params,
      total: rawArray.length,
      showTotal: true,
      sizeCanChange: true,
      onChange: (current, pageSize) =>
        setParams(val => ({ ...val, current, pageSize })),
      style: { marginRight: '24px' },
    },
  };
}
