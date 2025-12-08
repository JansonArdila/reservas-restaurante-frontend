import { useState } from 'preact/hooks';
import reservasStore from '../stores/reservasStore';

const ReservationForm = () => {
    const { crearReserva, loading, error, successMessage } = reservasStore();

    // Estado local para el formulario
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        reservation_date: '',
        reservation_time: '',
        party_size: 2,
        table_number: '',
        special_requests: ''
    });

    // Manejar cambios en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validar fecha y hora
            const selectedDateTime = new Date(`${formData.reservation_date}T${formData.reservation_time}`);
            const now = new Date();

            if (selectedDateTime <= now) {
                alert('Por favor selecciona una fecha y hora futuras');
                return;
            }

            // Crear reserva
            await crearReserva(formData);

            // Resetear formulario después de éxito
            setFormData({
                customer_name: '',
                customer_email: '',
                customer_phone: '',
                reservation_date: '',
                reservation_time: '',
                party_size: 2,
                table_number: '',
                special_requests: ''
            });

        } catch (err) {
            // El error ya está manejado en el store
            console.error('Error en el formulario:', err);
        }
    };

    // Generar opciones de hora (de 11:00 AM a 10:00 PM)
    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 11; hour <= 22; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                times.push(timeString);
            }
        }
        return times;
    };

    // Fecha mínima (hoy) y máxima (6 meses desde hoy)
    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    const maxDateString = maxDate.toISOString().split('T')[0];

    return (
        <div className="max-w-4xl mx-auto">
            {/* Mensajes de estado */}
            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fadeIn">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                </div>
            )}

            {successMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeIn">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{successMessage}</span>
                    </div>
                </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Reservar Mesa
                </h2>
                <p className="text-gray-600 text-center mb-8">
                    Completa el formulario para realizar tu reserva
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna izquierda */}
                    <div className="space-y-6">
                        {/* Nombre */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Nombre completo *
                            </label>
                            <input
                                type="text"
                                name="customer_name"
                                value={formData.customer_name}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="Ej: Juan Pérez"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="customer_email"
                                value={formData.customer_email}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="Ej: juan@email.com"
                            />
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                name="customer_phone"
                                value={formData.customer_phone}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="Ej: +57 300 123 4567"
                            />
                        </div>

                        {/* Número de personas */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Número de personas *
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[2, 3, 4, 5, 6, 8, 10, 12].map(size => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, party_size: size }))}
                                        className={`p-4 rounded-lg border-2 transition-all ${formData.party_size === size
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="font-bold text-lg">{size}</span>
                                        <span className="block text-xs mt-1">personas</span>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3">
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={formData.party_size}
                                    onChange={(e) => setFormData(prev => ({ ...prev, party_size: parseInt(e.target.value) }))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-sm text-gray-500 mt-1">
                                    <span>1</span>
                                    <span className="font-medium">Seleccionado: {formData.party_size}</span>
                                    <span>20+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="space-y-6">
                        {/* Fecha */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Fecha *
                            </label>
                            <input
                                type="date"
                                name="reservation_date"
                                value={formData.reservation_date}
                                onChange={handleInputChange}
                                required
                                min={today}
                                max={maxDateString}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Reservas disponibles para los próximos 6 meses
                            </p>
                        </div>

                        {/* Hora */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Hora *
                            </label>
                            <select
                                name="reservation_time"
                                value={formData.reservation_time}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="">Selecciona una hora</option>
                                {generateTimeOptions().map(time => (
                                    <option key={time} value={time}>
                                        {time} hrs
                                    </option>
                                ))}
                            </select>
                            <p className="text-sm text-gray-500 mt-1">
                                Horario: 11:00 AM - 10:00 PM
                            </p>
                        </div>

                        {/* Número de mesa preferida */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Mesa preferida (opcional)
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Terraza', 'Ventana', 'Privada'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData(prev => ({
                                            ...prev,
                                            table_number: type
                                        }))}
                                        className={`p-3 rounded-lg border transition ${formData.table_number === type
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                name="table_number"
                                value={formData.table_number}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition mt-3"
                                placeholder="O especifica un número de mesa"
                            />
                        </div>

                        {/* Solicitudes especiales */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-medium">
                                Solicitudes especiales
                            </label>
                            <textarea
                                name="special_requests"
                                value={formData.special_requests}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="Alergias, celebraciones, requerimientos especiales..."
                            />
                        </div>
                    </div>
                </div>

                {/* Botón de envío */}
                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Procesando reserva...
                            </div>
                        ) : (
                            'Confirmar Reserva'
                        )}
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-4">
                        * Campos obligatorios
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;