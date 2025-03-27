import { Task } from "@/types/task";
import { getTaskBgColor } from "@/utils/getDueDateStatus";
import { CircleCheck, Edit, Trash2 } from "lucide-react";
type Props = {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
    onToggleStatus: () => void;
};

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }: Props) {

    const status = task.statusTask;
    const due = new Date(task.dueDate);
    const today = new Date();
    const isOverdue = due < today && due.toDateString() !== today.toDateString();
    const isToday = due.toDateString() === today.toDateString();

    return (
        <div className={`relative grid grid-cols-[1fr_auto] gap-4 p-4 rounded-2xl shadow-sm ${getTaskBgColor(task.statusTask, task.dueDate)}`}>
            <div className="space-y-1 pr-8">
                <h3 className="font-bold text-2xl text-[#3A3A36]">{task.title}</h3>

                <div className="max-w-[200px] lg:max-w-[260px]">
                    <p className="text-sm text-[#5C5C57] truncate">
                        {task.description?.[0]?.children?.[0]?.text ?? ""}
                    </p>
                </div>

                <div className="space-y-1 text-xl pt-3 font-bold  text-skin-text">
                    <p>
                        <span className="">Start date :</span>{" "}
                        {task.startDate}
                    </p>
                    <p className={`${isOverdue && status === "pending" ? "text-red-700 font-semibold" : ""}`}>
                        <span className="">Due date :</span> {task.dueDate}
                        {isToday && status !== "completed" && <span> ⚠️</span>}
                        {isOverdue && status !== "completed" && <span> ❗</span>}
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-5 items-center pr-1">
                <button
                    onClick={onToggleStatus}
                    title={status === "pending" ? "Mark as Completed" : "Mark as Pending"}
                    className=" text-skin-text hover:opacity-80"
                >
                    <CircleCheck
                        className={`w-8 h-8 ${status === "completed" ? "text-white" : "text-skin-text"
                            }`}
                        fill={status === "completed" ? "#4B332F" : "none"}
                    />
                </button>
                <button
                    onClick={onEdit}
                    className="text-skin-text hover:text-blue-600 transition"
                >
                    <Edit className="w-8 h-8" />
                </button>
                <button
                    onClick={onDelete}
                    className="text-skin-text hover:text-red-600 transition"
                >
                    <Trash2 className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
}
