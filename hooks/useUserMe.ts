import QUERY_KEYS from '@/react-query/queryKeys';
import { User } from "@/types";
import fetchAPI from "@/utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";

type Res = {message : string, user: User}
export default function useUserMe() {
  return useQuery<Res, Error, User>({
    queryKey: [QUERY_KEYS.USER_ME],
    queryFn: () => fetchAPI.GET(`/auth/user`),
    select: (data: Res) => data.user,
  });
}
