import { create } from 'zustand';
import { reservationApi } from '../services/api';

const useReservationStore = create((set, get) => ({
    // Estado
    reservations: [],
    showReservations: false,
    loading: false,
    error: null,
    successMessage: '',

    // Acciones
    setShowReservations: (show) => set({ showReservations: show }),

    crearReserva: async (reservationData) => {
        set({ loading: true, error: null, successMessage: '' });

        try {
            // Validaciones básicas
            if (!reservationData.customer_name?.trim()) {
                throw new Error('El nombre es requerido');
            }

            if (!reservationData.customer_email?.trim()) {
                throw new Error('El email es requerido');
            }

            if (!reservationData.reservation_date) {
                throw new Error('La fecha es requerida');
            }

            if (!reservationData.reservation_time) {
                throw new Error('La hora es requerida');
            }

            // Enviar al backend
            const result = await reservationApi.crearReserva(reservationData);

            // Actualizar estado local
            set((state) => ({
                reservations: [...state.reservations, result.data],
                loading: false,
                successMessage: 'Reserva creada exitosamente!'
            }));

            // Limpiar mensaje después de 3 segundos
            setTimeout(() => {
                set({ successMessage: '' });
            }, 6000);

            return result;
        } catch (error) {
            console.error('Error creating reservation:', error);
            set({
                error: error.message || 'Error al crear la reserva',
                loading: false
            });
            throw error;
        }
    },

    fetchReservations: async () => {
        set({ loading: true, error: null });

        try {
            const result = await reservationApi.getAllReservations();
            set({
                reservations: result.data,
                loading: false
            });
        } catch (error) {
            set({
                error: 'Error al cargar las reservas',
                loading: false
            });
        }
    },

    clearMessages: () => set({ error: null, successMessage: '' }),
}));

export default useReservationStore;