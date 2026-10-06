import { notFound } from "next/navigation";
// import { setTimeout } from "timers/promises";

export default async function Page({ params }: { params: Promise<{slug: string}>}) {
    const { slug } = await params

    // await setTimeout(5000);

    if (slug === "_") {
        notFound()
    }

    const title = capitalizeFirstLetter(slug)

    return (
        <div>
            <h1>{title}</h1>
            <p>Paragraph</p>
        </div>
    )
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}