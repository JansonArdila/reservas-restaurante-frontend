const API_BASE_URL = '/api';

//const API_BASE_URL = 'https://reservas-restaurante-backend.onrender.com/api';

export const reservationApi = {
    async getAllReservations() {
        try {
            const response = await fetch(`${API_BASE_URL}/reservas`);
            if (!response.ok) throw new Error('Error al obtener reservas');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    async crearReserva(reservationData) {
        try {
            const response = await fetch(`${API_BASE_URL}/reservas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al crear reserva');
            }

            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    async actualizarReserva(id, updates) {
        try {
            const response = await fetch(`${API_BASE_URL}/reservas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });

            if (!response.ok) throw new Error('Error al actualizar reserva');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    async borrarReserva(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/reservas/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Error al eliminar reserva');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    async getReservationsByDate(date) {
        try {
            const response = await fetch(`${API_BASE_URL}/reservas/date/${date}`);
            if (!response.ok) throw new Error('Error al obtener reservas por fecha');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};