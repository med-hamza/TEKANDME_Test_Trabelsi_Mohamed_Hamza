interface StrapiErrorsProps {
    message: string | null;
    name: string;
    status: string | null;
}

export function StrapiErrors({ error }: { error?: StrapiErrorsProps | null }) {
    if (!error?.message) return null;
    return <div className="text-red-600 text-md italic py-2">{error.message}</div>;
}