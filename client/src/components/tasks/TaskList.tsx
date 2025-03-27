"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";
import Modal from "../modal/modal";
import TaskCard from "./TaskCard";
import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { showDueNotifications } from "@/utils/showDueNotifications";

export default function TaskList() {
    const {
        tasks,
        error,
        handleDelete,
        handleUpdate,
        handleToggleStatus,
    } = useTasks();

    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

    const normalizedSearch = search.toLowerCase();

    const filteredTasks = tasks.filter((task) => {
        if (filter !== "all" && task.statusTask !== filter) return false;

        const titleMatch = task.title.toLowerCase().includes(normalizedSearch);
        const descText = task.description?.[0]?.children?.[0]?.text?.toLowerCase() || "";
        const descMatch = descText.includes(normalizedSearch);

        return titleMatch || descMatch;
    });
    useEffect(() => {
        if (Notification.permission !== "granted") return;
        showDueNotifications(tasks);
        const interval = setInterval(() => {
            showDueNotifications(tasks);
        }, 200000);

        return () => clearInterval(interval);
    }, [tasks]);
    return (
        <div className="space-y-4 p-0 lg:p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 mt-8 lg:mt-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md font-medium bg-skin-filter text-brown-900 hover:opacity-90 transition focus:ring-2 focus:ring-brown-900"
                        >
                            {["all", "pending", "completed"].map((status) => (
                                <option key={status} value={status} className="bg-white">
                                    By {status}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-brown-900 pointer-events-none" />
                    </div>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-4 pr-10 py-2 border border-skin-filter rounded-md text-sm placeholder-skin-muted text-brown-900 focus:outline-none bg-transparent"
                    />
                    <Search
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-900"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                {filteredTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => {
                            setSelectedTask(task);
                            setTitle(task.title);
                            setDescription(task.description?.[0]?.children?.[0]?.text ?? "");
                            setOpenModal(true);
                        }}
                        onDelete={() => handleDelete(task.documentId)}
                        onToggleStatus={() => handleToggleStatus(task)}
                    />
                ))}
            </div>
            <Modal
                onClose={() => {
                    setOpenModal(false);
                    setSelectedTask(null);
                }}
                open={openModal}
                title="Edit Task"
            >
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (!selectedTask) return;

                        await handleUpdate(selectedTask.documentId, { title, description });
                        setOpenModal(false);
                        setSelectedTask(null);
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            className="w-full p-2 border rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea

                            className="w-full p-2 border rounded min-h-[150px]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-skin-accent text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                </form>
            </Modal>
        </div>
    );
}
