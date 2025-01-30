export interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterFormProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
