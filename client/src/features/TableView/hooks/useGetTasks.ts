import type { Task } from "@/src/types/types";
import { useEffect, useState } from "react";

export function useGetTasks(): { tasks: Task[] } {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    (async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}tasks`;
      const response = await fetch(url);
      const data: Task[] = await response.json();
      setTasks(data);
    })();
  }, []);
  return { tasks };
}
