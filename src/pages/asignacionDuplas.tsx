import React, { useState } from "react";
import { VentanaLienzo } from "react-ecosistema-unp/shared";
import { Encabezado, Subtitulo } from "react-ecosistema-unp/ui";
import { DndContext, type DragEndEvent, DragOverlay } from '@dnd-kit/core';
import type { Persona, Dupla } from "../utils/types";
import ListaAnalistas from "../components/ListaAnalistas";
import ListaRevisores from "../components/ListaRevisores";
import PanelDuplas from "../components/PanelDuplas";
import { FaUserEdit, FaUserCheck, FaUserFriends, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AsignacionDuplas: React.FC = () => {

    const breadcrumbItems = [
        { label: "Inicio", link: "/" },
        { label: "Asignación de duplas" },
    ];

    const [analistas] = useState<Persona[]>([
        { id: 'a1', nombre: 'Ana', rol: 'analista', experiencia: 5, correo: 'viviana@gmail.com', especialidad: 'Mujeres' },
        { id: 'a2', nombre: 'Luis', rol: 'analista', experiencia: 3, correo: 'viviana@gmail.com', especialidad: 'Mujeres' },
    ]);

    const [revisores] = useState<Persona[]>([
        { id: 'r1', nombre: 'Carlos', rol: 'revisor', experiencia: 4, correo: 'viviana@gmail.com', especialidad: 'Mujeres' },
        { id: 'r2', nombre: 'Sofía', rol: 'revisor', experiencia: 6, correo: 'viviana@gmail.com', especialidad: 'Mujeres' },
    ]);

    const [analistaSeleccionado, setAnalistaSeleccionado] = useState<Persona | null>(null);
    const [revisorSeleccionado, setRevisorSeleccionado] = useState<Persona | null>(null);
    const [duplasPendientes, setDuplasPendientes] = useState<Dupla[]>([]);
    const [draggingPersona, setDraggingPersona] = useState<Persona | null>(null);


    const handleDragStart = (event: any) => {
        const persona = [...analistas, ...revisores].find(p => p.id === event.active.id);
        if (persona) setDraggingPersona(persona);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setDraggingPersona(null); // limpiar overlay

        if (!over) return;

        const persona = [...analistas, ...revisores].find(p => p.id === active.id);
        if (!persona) return;

        if (over.id === 'drop-analista' && persona.rol === 'analista') {
            setAnalistaSeleccionado(persona);
        }

        if (over.id === 'drop-revisor' && persona.rol === 'revisor') {
            setRevisorSeleccionado(persona);
        }
    };

    const confirmarDupla = (analista: Persona, revisor: Persona) => {
        const match = Math.abs(analista.experiencia - revisor.experiencia) <= 2;
        setDuplasPendientes(prev => [...prev, { analista, revisor, match }]);
        setAnalistaSeleccionado(null);
        setRevisorSeleccionado(null);
    };

    const desestimarDupla = () => {
        setAnalistaSeleccionado(null);
        setRevisorSeleccionado(null);
    };


    return (
        <VentanaLienzo items={breadcrumbItems}>
            <Encabezado
                subtitle={"Subdirección de Evaluación de Riesgo"}
            ></Encabezado>
            <div className="container mt-4">
                <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <div className="row">
                        <div className="col-md-4">
                            <div style={{
                                border: '1px solid gainsboro',
                                borderRadius: '10px',
                                padding: '0 1.5rem',
                                marginBottom: '1.5rem',
                                backgroundColor: '#303d50',
                            }}>
                                <Subtitulo subtitle="Analistas de riesgo" icon={FaUserEdit} />
                            </div>
                            <ListaAnalistas analistas={analistas} />
                        </div>
                        <div className="col-md-4">
                            <div style={{
                                border: '1px solid gainsboro',
                                borderRadius: '10px',
                                padding: '0 1.5rem',
                                marginBottom: '1.5rem',
                                backgroundColor: '#303d50',
                            }}>
                                <Subtitulo subtitle="Panel de duplas" icon={FaUserFriends} />
                            </div>
                            <PanelDuplas
                                analista={analistaSeleccionado}
                                revisor={revisorSeleccionado}
                                onConfirmarDupla={confirmarDupla}
                                onDesestimarDupla={desestimarDupla}
                                draggingPersona={draggingPersona}
                            />
                        </div>
                        <div className="col-md-4">
                            <div style={{
                                border: '1px solid gainsboro',
                                borderRadius: '10px',
                                padding: '0 1.5rem',
                                marginBottom: '1.5rem',
                                backgroundColor: '#303d50',
                            }}>
                                <Subtitulo subtitle="Revisores de calidad" icon={FaUserCheck} />
                            </div>
                            <ListaRevisores revisores={revisores} />
                        </div>
                    </div>
                    <hr />
                    <h4>Duplas Confirmadas</h4>
                    <ul className="list-group">
                        {duplasPendientes.map((dupla, idx) => (
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    {dupla.analista.nombre} + {dupla.revisor.nombre}
                                </span>
                                <span className="d-flex align-items-center gap-2">
                                    {dupla.match ? (
                                        <>
                                            <FaCheckCircle style={{color:'#0cb452ff'}} />
                                            <span style={{color:'#0cb452ff'}}>Match</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaTimesCircle  style={{color:'#df1818ff'}} />
                                            <span style={{color:'#df1818ff'}} >No Match</span>
                                        </>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <DragOverlay>
                        {draggingPersona ? (
                            <div
                                className={`card p-3 text-white shadow d-flex flex-row align-items-center gap-3 animate__animated animate__fadeIn ${draggingPersona.rol === 'analista' ? 'bg-primary' : 'bg-success'
                                    }`}
                                style={{ minWidth: '250px' }}
                            >
                                {/* Ícono por rol */}
                                <i
                                    className={`bi ${draggingPersona.rol === 'analista' ? 'bi-person-workspace' : 'bi-search'
                                        } fs-2`}
                                ></i>

                                {/* Detalles */}
                                <div>
                                    <strong>{draggingPersona.nombre}</strong><br />
                                    <small>{draggingPersona.experiencia} años de experiencia</small><br />
                                    <small>{draggingPersona.correo}</small><br />
                                    <small>{draggingPersona.especialidad}</small>
                                </div>
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </VentanaLienzo>
    );
};

export default AsignacionDuplas;