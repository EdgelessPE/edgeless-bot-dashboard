import dayjs from 'dayjs';
import axios from 'axios';
import { PageData } from '@/routes/page.loader';
import { formatDate, SortBy, SortedItem } from '@/routes/utils';

interface UserQuery {
  sortBy: SortBy;
  search?: string;
  current: number;
  pageSize: number;
}

export default async ({
  query,
}: {
  query: UserQuery;
}): Promise<{
  total: number;
  list: SortedItem[];
}> => {
  const { sortBy, search, current, pageSize } = query;
  const statusMapRes = await axios('https://pineapple.edgeless.top/bot/data');
  const statusMap = statusMapRes.data as PageData['statusMap'];

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
  const startIndex = (current - 1) * pageSize;
  const dataSource = rawArray.slice(
    startIndex,
    Math.min(startIndex + pageSize, rawArray.length),
  );

  return {
    total: rawArray.length,
    list: dataSource,
  };
};
