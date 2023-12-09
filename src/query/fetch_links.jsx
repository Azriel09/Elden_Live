import { useQuery, useQueryClient } from "@tanstack/react-query";

const GetLinks = () => {
  const queryClient = useQueryClient();
  return useQuery({
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
  });
};

export default GetLinks;
