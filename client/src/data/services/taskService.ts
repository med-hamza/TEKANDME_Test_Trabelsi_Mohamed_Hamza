import { getStrapiURL } from "../lib/utils";

export const createTask = async (
    taskData: {
        title: string;
        description: string;
        dueDate: string;
        startDate: string
    },
    token: string
): Promise<any> => {
    try {
        const ROOT_URL = getStrapiURL();
        const response = await fetch(`${ROOT_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                data: {
                    ...taskData,
                    description: [{
                        type: "paragraph",
                        children: [{ type: "text", text: taskData.description }]
                    }],
                    statusTask: "pending",
                    priority: "medium"
                }
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Failed to create task");
        }
    } catch (error) {
        console.error("Task creation error:", error);
        throw new Error("An error occurred while creating the task.");
    }
};

export const updateTask = async (
    documentId: string,
    updates: {
        title?: string;
        description?: any;
        dueDate?: string;
        startDate: string;
        statusTask?: 'pending' | 'completed';
        priority?: 'low' | 'medium' | 'high';
    },
    token: string
): Promise<any> => {
    try {
        const ROOT_URL = getStrapiURL();

        const payload = { ...updates };

        const response = await fetch(`${ROOT_URL}/api/tasks/${documentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ data: payload }),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error("Strapi Error Response:", data);
            throw new Error(data?.error?.message || "Failed to update task");
        }
    } catch (error) {
        console.error("Task update error:", error);
        throw new Error("An error occurred while updating the task.");
    }
};




export const deleteTask = async (
    documentId: string,
    token: string
): Promise<void> => {
    try {
        const ROOT_URL = getStrapiURL();
        const response = await fetch(`${ROOT_URL}/api/tasks/${documentId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }
    } catch (error) {
        console.error("Task deletion error:", error);
        throw new Error("An error occurred while deleting the task.");
    }
};