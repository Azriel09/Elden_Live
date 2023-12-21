import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";

const GetData = () => {
  const queryClient = useQueryClient();
  const results = useQueries({
    queries: [
      {
        queryKey: ["links"],
        queryFn: () => {
          const data = fetch("http://localhost:8000/get_links").then((res) =>
            res.json(res).then((resdata) => {
              console.log(resdata);
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
          const data = fetch("http://localhost:8000/get_deaths").then((res) =>
            res.json(res).then((resdata) => {
              console.log(resdata);
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
    ],
  });
  const { isLoading: isLoadingStuff, data: links } = results[0];
  const { isLoading: isLoadingThings, data: deaths } = results[1];
  const isLoading = results.some((result) => result.isLoading);
  if (isLoading) {
    return "loading"
  }
  return { links, deaths };
};

export default GetData;
