export interface FormData {
    email: string;
    password: string;
  }
  
  export interface LoginFormProps {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  }