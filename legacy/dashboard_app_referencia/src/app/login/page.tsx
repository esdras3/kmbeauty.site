import { login } from "@/lib/auth";
import { KmLogo } from "@/components/KmLogo";

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const sp = await searchParams;
  const hasError = sp.error === "1";
  const hasConfigError = sp.error === "config";

  return (
    <div className="min-h-screen flex items-center justify-center bg-km-dark">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <KmLogo height={100} />
        </div>

        {hasError && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            Senha incorreta. Tente novamente.
          </p>
        )}

        {hasConfigError && (
          <p className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            Painel sem configuração segura. Defina `DASHBOARD_PASSWORD` e `SESSION_SECRET`.
          </p>
        )}

        <form action={login} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha de acesso
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-km-gold/40 focus:border-km-gold/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-km-gold hover:bg-km-gold-dark text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
