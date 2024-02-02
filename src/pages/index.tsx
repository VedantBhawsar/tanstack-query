"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { Todo } from "@/components/todo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
      <h1 className="text-4xl font-semibold">TanStack Query</h1>
      <Todo/>
      <ReactQueryDevtools />
    </main>
      </QueryClientProvider>
  );
}
