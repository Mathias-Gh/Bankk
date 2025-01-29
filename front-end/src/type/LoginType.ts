export interface FormData {
    email: string;
    password: string;
}

export interface LoginFormProps {
    formData: FormData;
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
}