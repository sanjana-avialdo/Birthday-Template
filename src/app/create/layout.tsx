import { StepNav } from "@/components/create/StepNav";
import { CreateFormProvider } from "@/components/create/CreateFormContext";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <CreateFormProvider>
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Create a birthday card</h1>
          <StepNav />
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </CreateFormProvider>
  );
}
