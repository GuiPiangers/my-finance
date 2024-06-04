import GoogleAuth from '@/components/googleLogin/GoogleLogin'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Registre-se</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Nome</Label>
              <Input id="email" type="email" placeholder="Seu nome" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@exemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
            <Button asChild style={{ width: '10px' }}>
              <GoogleAuth></GoogleAuth>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Já possuí uma conta?{' '}
            <Link href="/login" className="underline">
              Logar
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
