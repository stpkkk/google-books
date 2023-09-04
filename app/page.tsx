import { BookList } from "@/components";

export default function HomePage() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between">
      <BookList />
    </main>
  );
}
