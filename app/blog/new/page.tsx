async function handleSubmit(formData: FormData) {
    "use server"

    const title = formData.get("title") ?? ""
    const content = formData.get("content") ?? ""

    console.log(`Created blog article '${title}': ${content}`)
}

export default function Page() {
    return (
        <form action={handleSubmit}>
            <input type="text" name="title" placeholder="Title" />
            <input type="text" name="content" placeholder="Content" />
            <button type="submit" >Create</button>
        </form>
    )
}