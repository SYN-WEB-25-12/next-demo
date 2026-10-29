import { loginAction, registerAction } from "./actions";

export default function Page() {
    return (
        <>
            <h2>Register</h2>
            <form action={registerAction}>
                <input name="first" placeholder="first" />
                <input name="last" placeholder="last" />
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button type="submit">Erstellen</button>
            </form>
            <h2>Login</h2>
            <form action={loginAction}>
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
        </>
    )
}