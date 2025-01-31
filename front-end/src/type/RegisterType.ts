export interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterFormProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent) => void;
    errors: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };}
