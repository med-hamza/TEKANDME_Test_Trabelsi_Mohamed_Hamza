"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { createTask } from "@/data/services/taskService";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Plus } from "lucide-react";
import { Task } from "@/types/task";
import { fetchTasks } from "@/data/services/fetchTask";
import TaskList from "./TaskList";
import { getFormattedDateParts } from "@/utils/getDueDateStatus";


export default function TaskForm() {
    const [token, setToken] = useState<string>("");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: new Date(),
        dueDate: new Date()
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const token = Cookies.get("jwt") || "";
        setToken(token)
        if (!token) return;
        fetchTasks(token).then(setTasks).catch(console.error);
    }, []);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await createTask({
                title: formData.title,
                description: formData.description,
                startDate: formData.startDate.toLocaleDateString("en-CA"),
                dueDate: formData.dueDate.toLocaleDateString("en-CA")
            }, token);
            setFormData({
                title: "",
                description: "",
                dueDate: new Date(),
                startDate: new Date(),
            });
            alert("Task created successfully!");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create task");
        } finally {
            setIsLoading(false);
        }
    };
    const { dayName, dateRest } = getFormattedDateParts();



    const taskDates = tasks.map((task) => new Date(task.dueDate));

    const taskCountByDate = tasks.reduce<Record<string, number>>((acc, task) => {
        const key = task.dueDate;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const modifiers = Object.keys(taskCountByDate).map(dateStr => new Date(dateStr));


    const taskCountByStatus = tasks.reduce(
        (acc, task) => {
            if (task.statusTask === "completed") acc.completed++;
            else acc.pending++;
            acc.total++;
            return acc;
        },
        { completed: 0, pending: 0, total: 0 }
    );

    return (
        <section className="mx-auto p-4">
            {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col lg:flex-row  gap-4  justify-center">
                <div className="w-full lg:w-4/12">
                    <div className="text-xl font-medium text-gray-700 pt-10 lg:text-start text-center">
                        <div className=" font-light font-island text-6xl text-skin-accent">
                            {dayName}
                        </div>{" "}
                        <div className=" font-bold text-4xl text-black"> {dateRest}</div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3 flex flex-col lg:flex-row justify-center gap-4 items-start">
                    <input
                        type="text"
                        placeholder="Type Title Of Task"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="px-4  w-full lg:w-2/5 py-5 rounded-md bg-skin-input text-sm text-form-input placeholder-gray-500 outline-none shadow-sm"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Detail Of Your Task"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="px-4  w-full lg:w-4/5 py-5 rounded-md bg-skin-input text-sm text-form-input placeholder-gray-500 outline-none shadow-sm"
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className=" lg:w-24 w-1/3 mx-auto lg:mx-0 h-14 bg-form-green rounded-e-md hover:bg-green-700 text-white  flex items-center justify-center shadow-md transition"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </form>


            <div className="p-1 lg:p-4 flex flex-col lg:flex-row items-start justify-between">
                <div className="w-full md:w-auto mt-4">
                    <DayPicker
                        mode="range"
                        selected={{
                            from: formData.startDate || undefined,
                            to: formData.dueDate || undefined,
                        }}
                        onSelect={(range) => {
                            if (range?.from && range?.to) {
                                setFormData((prev) => ({
                                    ...prev,
                                    startDate: range.from as Date,
                                    dueDate: range.to as Date,
                                }));
                            }
                        }}
                        disabled={{ before: new Date() }}
                        numberOfMonths={1}
                        showOutsideDays
                        className="bg-white p-4 rounded-md shadow"
                        captionLayout="dropdown"
                        fromYear={2023}
                        toYear={2030}
                        modifiers={{ hasTasks: modifiers }}
                        modifiersClassNames={{ hasTasks: "bg-skin-accent w-4 rounded-full text-white" }}
                    />
                </div>
                <div className="flex-1">
                    <TaskList />
                </div>
            </div>
            <div className="mt-6 flex mb-20  justify-center w-4/5 mx-auto gap-6">
                <div className="bg-skin-filter rounded-3xl p-6 text-center w-2/6  shadow">
                    <p className="text-xl font-semibold text-[#3A3A36]">COMPLETED TASKS</p>
                    <p className="text-4xl font-extrabold text-[#3A3A36] mt-2">
                        {String(taskCountByStatus.completed).padStart(2, "0")}
                    </p>
                </div>

                <div className="bg-[#B38D8D] rounded-3xl p-6 text-center w-2/6  shadow">
                    <p className="text-xl font-bold text-white">PENDING TASKS</p>
                    <p className="text-4xl font-extrabold text-white mt-2">
                        {String(taskCountByStatus.pending).padStart(2, "0")}
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-lg w-7/12 items-center gap-10  flex justify-center text-center">
                    <p className="text-sky-700 text-xl font-semibold tracking-wide">TASKS CREATED</p>
                    <p className="text-6xl font-extrabold text-black ">
                        {taskCountByStatus.total.toLocaleString()}
                    </p>
                </div>
            </div>
        </section>
    );
}
