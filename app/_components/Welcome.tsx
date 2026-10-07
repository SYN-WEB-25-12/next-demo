"use client"

import { useSearchParams } from "next/navigation";

export default function Welcome() {
      const searchParams = useSearchParams()
    
      const lang = searchParams.get("lang") ?? "en"
      const name = searchParams.get("name") ?? "Syntax"
    
      const greetings = {
        en: "Hello",
        de: "Hallo",
        es: "Hola"
      }
    
      const greeting = greetings[lang as keyof typeof greetings] ?? greetings.en
    
    return <span>{greeting}, {name}!</span>
}