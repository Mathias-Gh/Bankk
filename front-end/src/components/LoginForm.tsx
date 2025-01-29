import React from "react"
import { LoginFormProps } from "../type/LoginType"

const LoginForm: React.FC<LoginFormProps>  = ({ formData, handleLogin }) => {
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                </div>
                <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                />
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
    )
}

export default LoginForm;

