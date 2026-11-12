import sessionService from "@/lib/session";
import { LoginForm, RegisterForm } from "./AuthForms";
import { logoutAction } from "./actions";

export default async function Page() {
  const session = await sessionService.getCurrent();

  if (session) {
    return (
      <div className="flex flex-col gap-4 max-w-md">
        <h2 className="text-xl font-bold">Logged In</h2>
        <p>
          You are currently signed in as <strong>{session.email}</strong>
          {session.firstName ? ` (${session.firstName} ${session.lastName})` : ""}.
        </p>
        <form action={logoutAction}>
          <button
            type="submit"
            className="bg-red-600 text-white rounded px-4 py-1.5 hover:bg-red-700"
          >
            Logout
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-md">
      <div>
        <h2 className="text-xl font-bold mb-3">Login</h2>
        <LoginForm />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
