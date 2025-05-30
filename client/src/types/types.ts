export type Status = "通過" | "結果待ち" | "応募予定" | "落選";

export type Task = {
  id: string;
  name: string;
  status: Status;
  nextStep: string | null;
  dueDate: string | null;
  tags: string[];
};

export type ViewType = "table" | "calendar";
