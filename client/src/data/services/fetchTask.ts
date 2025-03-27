import { Task } from "@/types/task";
import { getStrapiURL } from "../lib/utils";

export const fetchTasks = async (token: string): Promise<Task[]> => {
    try {
        const ROOT_URL = getStrapiURL();
        const response = await fetch(`${ROOT_URL}/api/tasks`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const fetchdata = await response.json();

        if (response.ok) {
            return fetchdata.data;

        } else {
            throw new Error(fetchdata.message || "Failed to create task");
        }
    } catch (error) {
        console.error("Task creation error:", error);
        throw new Error("An error occurred while creating the task.");
    }
};


