import { registerAction } from "./actions";

/*

    await prisma.user.create({
      data: { 
          firstName: "Alice",
          lastName: "Alisson",
          email: "alice@test.com",
          passwordHash: "abcd",
          posts: {
            create: [{
              title: "Alice's first post",
              content: "Here is what she says."
            }, {
              title: "Alice's second post",
              content: "Even more content."
            }]
          }
        }
    })

*/
export default function Page() {
    return (
        <>
            <h1>Sign Up</h1>
            <form action={registerAction}>
                <input name="first" placeholder="first" />
                <input name="last" placeholder="last" />
                <input name="email" placeholder="email" />
                <input name="password" placeholder="password" />
                <button type="submit">Erstellen</button>
            </form>
        </>
    )
}