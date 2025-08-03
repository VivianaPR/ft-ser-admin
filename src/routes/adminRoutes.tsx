import { Route } from "react-router-dom";
import AsignacionDuplas from "../pages/asignacionDuplas";

export const AdminRoutes = () => (
    <Route path="ser/admin">
        <Route path="asignacion-duplas" element={<AsignacionDuplas />} />
    </Route>
);