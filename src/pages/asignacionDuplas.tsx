import React from "react";
import { VentanaLienzo } from "react-ecosistema-unp/shared";
import { Encabezado } from "react-ecosistema-unp/ui";

const AsignacionDuplas: React.FC = () => {

    const breadcrumbItems = [
        { label: "Inicio", link: "/" },
        { label: "Asignación de duplas" },
    ];

    return (
        <VentanaLienzo items={breadcrumbItems}>
            <Encabezado
                subtitle={"Subdirección de Evaluación de Riesgo"}
            ></Encabezado>
        </VentanaLienzo>
    );
};

export default AsignacionDuplas;