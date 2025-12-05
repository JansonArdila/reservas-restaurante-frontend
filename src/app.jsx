import { useEffect, useState } from 'preact/hooks'
import { reservationApi } from './services/api'
import './services/styles.css'

export function App() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadReservations = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await reservationApi.getAllReservations()
      setReservations(result.data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading reservations:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReservations()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🍽️ Sistema de Reservas de Restaurante
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aquí podrás reservar una mesa en PRESIK
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel de estado */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Estado del Sistema</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-800">Backend API</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    ✅ Activo
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-800">Base de Datos</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    🗄️ PostgreSQL
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-800">Reservas Totales</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                    {reservations.length}
                  </span>
                </div>
              </div>
            </div>
            {/*
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Comandos Útiles</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm text-gray-700">cd server && npm run dev</code>
                  <p className="text-xs text-gray-500 mt-1">Iniciar backend</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm text-gray-700">cd client && npm run dev</code>
                  <p className="text-xs text-gray-500 mt-1">Iniciar frontend</p>
                </div>
              </div>
            </div>
            */}
          </div>

          {/* Lista de reservas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">📅 Reservas Recientes</h2>
                <button
                  onClick={loadReservations}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Actualizar
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-medium">Error: {error}</p>
                  <button
                    onClick={loadReservations}
                    className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Reintentar
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fecha/Hora
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Personas
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mesa
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reservations.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                            No hay reservas disponibles
                          </td>
                        </tr>
                      ) : (
                        reservations.map((reservation) => (
                          <tr key={reservation.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-gray-900">{reservation.customer_name}</p>
                                <p className="text-sm text-gray-500">{reservation.customer_email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {new Date(reservation.reservation_date).toLocaleDateString('es-ES')}
                                </p>
                                <p className="text-sm text-gray-500">{reservation.reservation_time}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {reservation.party_size} personas
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                {reservation.table_number || 'Por asignar'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${reservation.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : reservation.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : reservation.status === 'cancelled'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}
                              >
                                {reservation.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/*
            <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">✅ Día 2 Completado</h3>
              <p className="opacity-90">
                Backend API funcionando con PostgreSQL. Mañana implementaremos el formulario de reservas y Zustand.
              </p>
            </div>
            */}
          </div>
        </div>
      </div>
    </div >
  )
}
