"use client";

import { useActionState } from "react";
import { loginAction, registerAction } from "./actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-2 max-w-sm">
      {state?.error && (
        <p className="text-red-500 text-sm font-medium">{state.error}</p>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="border border-gray-300 rounded px-3 py-1.5"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="border border-gray-300 rounded px-3 py-1.5"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white rounded px-4 py-1.5 hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-2 max-w-sm">
      {state?.error && (
        <p className="text-red-500 text-sm font-medium">{state.error}</p>
      )}
      <input
        type="text"
        name="first"
        placeholder="First name"
        required
        className="border border-gray-300 rounded px-3 py-1.5"
      />
      <input
        type="text"
        name="last"
        placeholder="Last name"
        required
        className="border border-gray-300 rounded px-3 py-1.5"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="border border-gray-300 rounded px-3 py-1.5"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="border border-gray-300 rounded px-3 py-1.5"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-green-600 text-white rounded px-4 py-1.5 hover:bg-green-700 disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Register"}
      </button>
    </form>
  );
}
