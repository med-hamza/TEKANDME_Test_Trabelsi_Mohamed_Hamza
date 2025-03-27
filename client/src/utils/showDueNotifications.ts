import { Task } from "@/types/task";

export const showDueNotifications = (tasks: Task[]) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  tasks.forEach((task) => {
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    const diff = due.getTime() - now.getTime();
    const daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0 || daysDiff < 0) {
      const message =
        daysDiff === 0
          ? `📅 "${task.title}" is due today!`
          : `⚠️ "${task.title}" is overdue!`;

      new Notification("⏰ Task Reminder", {
        body: message,
      });
    }
  });
};