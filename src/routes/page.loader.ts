export interface PageData {
  statusMap: Record<
    string,
    {
      recent: {
        health: number;
        latestVersion: string;
        errorMessage: string;
        builds: {
          fileName: string;
          version: string;
          timestamp: string;
        }[];
      };
    }
  >;
}

export default async function (): Promise<PageData> {
  const statusMapRes = await fetch('https://pineapple.edgeless.top/bot/data');
  return {
    statusMap: await statusMapRes.json(),
  };
}
