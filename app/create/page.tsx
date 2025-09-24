import { Header } from "@/components/header"
import { CreateRaffleForm } from "@/components/create-raffle-form"

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Raffle</h1>
            <p className="text-muted-foreground">
              Deploy your raffle across multiple chains and reach a wider audience
            </p>
          </div>
          <CreateRaffleForm />
        </div>
      </main>
    </div>
  )
}
