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

let cache: PageData | undefined;

export default async function (): Promise<PageData> {
  if (!cache) {
    const statusMapRes = await fetch(
      'https://cloud.edgeless.top/Bot/database.json',
    );
    cache = {
      statusMap: await statusMapRes.json(),
    };
  }
  return cache;
}
