"use client";
import {
  QueryClient,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import React from "react";

interface TodoData {
  body: string;
  id: number;
  title: string;
  userId: number;
}

interface User {
  id: number;
}

export const Todo = () => {
  const queryClient = useQueryClient();

  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async function () {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    },
  });

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async function () {
      let { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return data;
    },
  });

  const infiniteQuery = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      console.log(pageParam);
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/" + pageParam
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (recentlyFetched, pages) => {
      return recentlyFetched.id + 1;
    },
  });

  const mutation = useMutation({
    mutationFn: function () {
      return axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: "foo",
        body: "bar",
        userId: 1,
      });
    },
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: ["posts"] });
    },
  });

  if (isError) {
    return <p>Something went wrong!</p>;
  }

  if (isLoading && mutation.isPending) {
    return <p>Fetching Place Wait</p>;
  } else {
    return (
      <section className="flex flex-col gap-5 mt-10 items-center">
        <h2 className="mt-10 text-2xl font-sans font-bold">Todo</h2>
        <div className="flex gap-5">
          <button
            className="p-3 py-2 font-bold font-sans rounded-lg border bg-white hover:bg-black hover:text-white transition-all duration-300 text-black "
            onClick={() => {
              mutation.mutate();
            }}
          >
            Mutation
          </button>
          <button
            className="p-3 py-2 font-bold font-sans rounded-lg border bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
            onClick={() => {
              infiniteQuery.fetchNextPage();
            }}
          >
            InfiniteScroll
          </button>
        </div>

        <div className="flex flex-col">
          {infiniteQuery.isFetched && (
            <div>
              <p>{data.id}</p>
              <p>{data.title}</p>
              <p>{data.body}</p>
              <p>{data.title}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex font-bold bg-white/10 font-sans uppercase justify-between">
            <p className="flex-[1] border p-3">id</p>
            <p className="flex-[3] border p-3">title</p>
            <p className="flex-[6] border p-3">body</p>
          </div>

          {data?.map((data: TodoData, index: number) => {
            return (
              <div key={data.id} className={"flex justify-between"}>
                <p className="flex-[1] border p-3">{data.id}</p>
                <p className="flex-[3] border p-3">{data.title}</p>
                {/* <p className="flex-[6] border p-3">{data.body}</p> */}
              </div>
            );
          })}
        </div>
      </section>
    );
  }
};

// dashboard
// analitics pages
// 2 popup -: 1 product, 1 sales integrate
