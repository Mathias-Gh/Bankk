export interface BeneficiaryFormProps {
    formData: {
      name: string;
      iban: string;
    };
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    errors: {
      name: string;
      iban: string;
    };
  }
  