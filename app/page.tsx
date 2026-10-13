import { Suspense } from "react";
import Counter from "./_components/Counter";
import Welcome from "./_components/Welcome";

export default function Page() {

  return (
    <main>
      <h1>
        <Suspense>
          <Welcome />
        </Suspense>
      </h1>
      <Counter/>
    </main>
  );
}
