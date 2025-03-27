const statusBgMap: Record<string, string> = {
    today: "bg-red-100",
    soon: "bg-yellow-100",
    normal: "bg-skin-filter",
    completed: "bg-form-completed",
};

export const getTaskBgColor = (status: string, dueDate: string): string => {
    if (status === "completed") return statusBgMap["completed"];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diff === 0) return statusBgMap["today"];
    if (diff <= 3) return statusBgMap["soon"];
    return statusBgMap["normal"];
};


export const getFormattedDateParts = () => {
    const date = new Date();
    return {
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
        dateRest: date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }).replace(',', '')
    };
};