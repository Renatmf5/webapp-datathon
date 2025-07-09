import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Decision Plataforma</h1>
        <p className="text-lg items-center justify-center max-w-[900px] text-gray-600 mb-8">
          Bem-vindo ao Projeto do Datathon.
          Essa plataforma web foi desenvolvida para apresentar os resultados dos modelos de recomendação e matching de perfis de candidatos a vagas de emprego, esses dados foram capturados e são tratados pela empresa Decision a qual desempenha um papel no fundamental no processo de recrutamento de taletos
        </p>
        <div className="flex gap-4">
          <Button asChild variant={'outline'}>
            <Link href="/dashboard/vagas/">Ir para Vagas</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/candidatos/">Ir para Candidatos</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/prospects/">Ir para Prospects</Link>
          </Button>
        </div>
      </div>
    </>
  )
}