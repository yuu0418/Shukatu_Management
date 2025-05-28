import type { Task } from "@/types/types";
import { useEffect, useState } from "react";

export function useGetTasks(): { tasks: Task[] } {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    (async () => {
      const url = "/tasks.json";
      const response = await fetch(url);
      const data: Task[] = await response.json();
      setTasks(data);
    })();
  }, []);
  return { tasks };
}
