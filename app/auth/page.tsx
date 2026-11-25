import sessionService from "@/lib/session";
import { LoginForm, RegisterForm } from "./AuthForms";
import { logoutAction } from "./actions";
import { getInitials } from "@/app/authors/authors.helpers";

export default async function Page() {
  const session = await sessionService.getCurrent();

  if (session) {
    return (
      <div>
      <h1 className="text-4xl font-bold tracking-tight mb-6">Profile</h1>
      <div className="flex w-full items-center gap-5 rounded-lg border border-gray-200 bg-white/70 p-6 shadow-sm">
        <div
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl font-semibold text-gray-600 ring-1 ring-gray-200"
        >
          {getInitials(session.firstName, session.lastName)}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="truncate text-xl font-semibold text-gray-900">
            {[session.firstName, session.lastName].filter(Boolean).join(" ") ||
              session.email}
          </h2>
          <p className="truncate text-sm text-gray-500">{session.email}</p>
        </div>

        <form action={logoutAction} className="shrink-0">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg border border-red-200 px-5 py-2 text-sm font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-1 cursor-pointer"
          >
            Log out
          </button>
        </form>
      </div>
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
