import React from "react";
import { LoginFormProps } from "../type/LoginType";

const LoginForm: React.FC<LoginFormProps> = ({ formData, handleLogin, handleChange, errors }) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page
    handleLogin(event);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center">Connexion</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Pas encore inscrit ?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Créez un compte
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
