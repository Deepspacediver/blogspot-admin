import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getUserDetails } from "./fetch";

export const userQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: getUserDetails,
});

export const useUser = () => {
  return useSuspenseQuery(userQueryOptions);
};
