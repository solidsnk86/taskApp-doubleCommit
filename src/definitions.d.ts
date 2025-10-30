interface UserProps {
  message: string;
  user: {
    user_id: number;
    user_name: string;
    user_email: string;
    user_update: boolean;
    created_at: Date | string;
    user_password: string;
    user_avatar: string;
    updated_at: Date | string;
    ip: string;
    city: string;
    state: string;
    country: string
  };
}

type Task = {
  task_id?: number;
  title?: string;
  description?: string;
  task_updated?: boolean;
  updated_at?: Date | string; 
  created_at?: Date | string;
  task_done?: boolean;
};

interface TasksProps {
  message: string;
  tasks: Task[];
  deleteTask: (id: number) => void;
  refreshTasks: () => Promise<void>;
  editTask: (id: number) => Promise<void>;
  sortTasks: (tasks: Task[]) => Array<Task>;
}

type PartialUserProps = Partial<UserProps>;
type PartialTasksProps = Partial<TasksProps>;

export { PartialUserProps, PartialTasksProps, UserProps, TasksProps, Task };
