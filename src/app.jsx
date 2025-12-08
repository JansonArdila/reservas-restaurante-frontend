import ReservasForm from './components/ReservasForm';
import ReservasList from './components/ReservasList';
import reservasStore from './stores/reservasStore';
import './services/styles.css';
import logo from './images/logo.png';

export function App() {
  const { showReservations, setShowReservations } = reservasStore();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* 🔵 Fondo con logo como marca de agua */}
      <div
        className="absolute inset-0 bg-center bg-[length:450px_450px] opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${logo})` }}
      />

      {/* 🔵 Todo el contenido va encima del fondo */}
      <div className="relative z-10">

        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">

              {/* LOGO + TEXTO DEL HEADER */}
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <img src={logo} alt="Logo" className="w-16 h-16 md:w-20 md:h-20" />

                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    RESERVAS PRESIK
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Sistema de gestión de reservas para restaurante PRESIK
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="container mx-auto px-4 py-8">
          {!showReservations ? (
            <>
              <ReservasForm />

              {/* Footer con botón Copyright */}
              <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <button
                    onClick={() => setShowReservations(true)}
                    className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                  >
                    © 2025 Sistema de reservas para restaurante PRESIK
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <ReservasList />
          )}

          {/* Estado del sistema *
          <div className="mt-8 bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">Backend API: Activo</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm text-gray-600">PostgreSQL: Conectado</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-sm text-gray-600">Zustand: Configurado</span>
              </div>
            </div>            
          </div>
          */}
        </main>

      </div>
    </div>
  );
}
