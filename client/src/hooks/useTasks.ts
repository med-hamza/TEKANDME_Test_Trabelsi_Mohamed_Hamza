import { useEffect, useState, useCallback } from "react";
import { Task } from "@/types/task";
import { fetchTasks } from "@/data/services/fetchTask";
import { deleteTask, updateTask } from "@/data/services/taskService";
import Cookies from "js-cookie";

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getToken = () => Cookies.get("jwt") || "";

    const loadTasks = useCallback(async () => {
        try {
            const token = getToken();
            if (!token) throw new Error("No token found");
            const data = await fetchTasks(token);
            setTasks(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load tasks");
        }
    }, []);

    const handleDelete = async (documentId: string) => {
        try {
            const token = getToken();
            await deleteTask(documentId, token);
            await loadTasks();
        } catch (err) {
            alert(err instanceof Error ? err.message : "Delete failed");
        }
    };

    const handleUpdate = async (
        documentId: string,
        updates: { title?: string; description?: string; statusTask?: "pending" | "completed" }
    ) => {
        try {
            const token = getToken();

            const payload: any = {
                ...updates,
            };

            if (updates.description !== undefined) {
                payload.description = [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "text",
                                text: updates.description.trim(),
                            },
                        ],
                    },
                ];
            }

            await updateTask(documentId, payload, token);
            await loadTasks();
        } catch (err) {
            console.error("Update error:", err);
            alert(err instanceof Error ? err.message : "Update failed");
        }
    };




    const handleToggleStatus = async (task: Task) => {
        const newStatus = task.statusTask === "pending" ? "completed" : "pending";
        await handleUpdate(task.documentId, { statusTask: newStatus });
    };

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    return {
        tasks,
        error,
        handleDelete,
        handleUpdate,
        handleToggleStatus,
        reload: loadTasks,
    };
}
