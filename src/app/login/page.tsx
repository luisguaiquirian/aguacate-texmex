export default function Login() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-lime-500 selection:text-black text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Administración
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-400">
          Inicia sesión para gestionar Aguacate Tex-Mex
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-neutral-900 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-white/5">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-neutral-700 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm bg-neutral-950 text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-neutral-700 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm bg-neutral-950 text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-lime-500 focus:ring-lime-500 border-neutral-700 rounded bg-neutral-950"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-300">
                  Recuérdame
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-lime-500 hover:text-lime-400">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-lime-500 hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 focus:ring-offset-neutral-900 transition-colors"
              >
                Entrar al Sistema
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
             <a href="/" className="text-sm text-neutral-500 hover:text-white transition-colors">Volver a la página principal</a>
          </div>
        </div>
      </div>
    </div>
  );
}
