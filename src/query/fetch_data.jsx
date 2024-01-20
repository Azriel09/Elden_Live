import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
const apiKeyData = import.meta.env.VITE_API_KEY;
const GetData = () => {
  const queryClient = useQueryClient();
  const results = useQueries({
    queries: [
      {
        queryKey: ["links"],
        queryFn: () => {
          const data = fetch("http://localhost:8000/get_links", {
            headers: {
              apiKey: apiKeyData,
            },
          }).then((res) =>
            res.json(res).then((resdata) => {
              return resdata;
            })
          );

          return data;
        },
        initialData: () => {
          return queryClient.getQueryData(["links"]);
        },
        staleTime: 120000,
      },
      {
        queryKey: ["deaths"],
        queryFn: () => {
          const data = fetch("http://localhost:8000/get_deaths", {
            headers: {
              apiKey: apiKeyData,
            },
          }).then((res) =>
            res.json(res).then((resdata) => {
              return resdata;
            })
          );

          return data;
        },
        initialData: () => {
          return queryClient.getQueryData(["deaths"]);
        },
        staleTime: 120000,
      },
      {
        queryKey: ["boss_talents_stats"],
        queryFn: () => {
          const data = fetch("http://localhost:8000/get_boss_stats", {
            headers: {
              apiKey: apiKeyData,
            },
          }).then((res) =>
            res.json(res).then((resdata) => {
              return resdata;
            })
          );

          return data;
        },
        initialData: () => {
          return queryClient.getQueryData(["boss_talents_stats"]);
        },
        staleTime: 120000,
      },
    ],
  });
  const { isLoading: isLoadingLinks, data: links } = results[0];
  const { isLoading: isLoadingDeaths, data: deaths } = results[1];
  const { isLoading: isLoadingBossStats, data: bossStats } = results[2];
  const isLoading = results.some((result) => result.isLoading);
  if (isLoading) {
    return "loading";
  }
  return { links, deaths, bossStats };
};

export default GetData;
