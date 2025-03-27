"use client";

import { useState } from "react";

interface LoaderProps {
    text: string;
}

function Loader({ text }: LoaderProps) {
    return (
        <div className="flex items-center space-x-2">
            <svg
                className="h-4 w-4 animate-spin mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                >
                </path>
            </svg>
            <span>{text}</span>
        </div>
    );
}

interface SubmitButtonProps {
    text: string;
    loadingText: string;
    className?: string;
    loading?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export function SubmitButton({
    text,
    loadingText,
    loading = false,
    className = "",
    type = "submit",
    onClick
}: SubmitButtonProps) {
    // For form submission handling without react-dom
    const [isPending, setIsPending] = useState(false);

    const handleClick = async (e: React.FormEvent) => {
        if (type === "submit" && onClick) {
            e.preventDefault();
            setIsPending(true);
            try {
                await onClick();
            } finally {
                setIsPending(false);
            }
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            aria-disabled={isPending || loading}
            disabled={isPending || loading}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-indigo-600 text-white hover:bg-indigo-700 h-10 py-2 px-4 ${className}`}
        >
            {isPending || loading ? <Loader text={loadingText} /> : text}
        </button>
    );
}

// Example usage with the password toggle button:
function PasswordToggleButton({ showPassword, setShowPassword }: {
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
}) {
    return (
        <button
            type="button"
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
        >
            {showPassword ? (
                <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
            ) : (
                <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            )}
        </button>
    );
}