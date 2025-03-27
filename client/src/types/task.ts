interface DescriptionBlock {
    type: string;
    children: Array<{
        type: string;
        text: string;
    }>;
}

export interface Task {
    id: number;
    title: string;
    description: DescriptionBlock[];
    documentId: string;
    dueDate: string;
    statusTask: 'pending' | 'completed';
    priority: 'low' | 'medium' | 'high';
    startDate: string | null;
}

export interface TasksResponse {
    data: Task[];
    meta?: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}