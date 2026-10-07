import Counter from "./_components/Counter";
import Welcome from "./_components/Welcome";

export default function Page() {

  return (
    <main>
      <h1>
        <Welcome />
      </h1>
      <Counter/>
    </main>
  );
}
