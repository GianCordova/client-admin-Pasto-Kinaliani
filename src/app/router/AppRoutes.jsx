import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore.js";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardContainer } from "../../shared/components/layout/DashboardContainer.jsx";
import { Empleados } from "../../features/empleados/components/Empleados.jsx";
import { Inventario } from "../../features/inventario/components/Inventario.jsx";
import { Mesas } from "../../features/mesas/components/mesas.jsx";
import { Pedidos } from "../../features/pedidos/components/Pedidos.jsx";
import { Platillos } from "../../features/platillos/components/Platillos.jsx";
import { Proveedores } from "../../features/proveedores/components/Proveedores.jsx";
import { Reservaciones } from "../../features/reservaciones/components/Reservaciones.jsx";
import { Sucursales } from "../../features/sucursales/components/Sucursales.jsx";
import { Usuarios } from "../../features/usuarios/components/Usuarios.jsx";
import { Ventas } from "../../features/ventas/components/Ventas.jsx";

export const AppRoutes = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    return (
        <Routes>
            {/* Publicas */}
            <Route path="/" element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />
            } />

            {/* Protegido por role */}
            <Route path="/dashboard" element={
                isAuthenticated ? <DashboardContainer /> : <Navigate to="/" replace />
            }>
                <Route path="empleados" element={<Empleados />} />
                <Route path="inventario" element={<Inventario />} />
                <Route path="mesas" element={<Mesas />} />
                <Route path="pedidos" element={<Pedidos />} />
                <Route path="platillos" element={<Platillos />} />
                <Route path="proveedores" element={<Proveedores />} />
                <Route path="reservaciones" element={<Reservaciones />} />
                <Route path="sucursales" element={<Sucursales />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="ventas" element={<Ventas />} />
            </Route>

        </Routes>
    );
}