import React, { useState } from "react";
import { VentanaLienzo } from "react-ecosistema-unp/shared";
import { Encabezado, Subtitulo } from "react-ecosistema-unp/ui";
import { DndContext, type DragEndEvent, DragOverlay } from '@dnd-kit/core';
import type { Persona, Dupla } from "../utils/types";
import ListaAnalistas from "../components/ListaAnalistas";
import ListaRevisores from "../components/ListaRevisores";
import PanelDuplas from "../components/PanelDuplas";
import { FaUserFriends, FaUserEdit, FaUserCheck } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown, FaArrowRightArrowLeft } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AsignacionDuplas: React.FC = () => {

    const breadcrumbItems = [
        { label: "Inicio", link: "/" },
        { label: "Asignación de duplas" },
    ];

    const [analistas] = useState<Persona[]>([
        { id: 'a1', nombre: 'Ana María Castillo', rol: 'analista', experiencia: 9, correo: 'viviana@gmail.com', especialidad: 'Mujeres' },
        { id: 'a2', nombre: 'Luis Alfredo Ramirez Méndez', rol: 'analista', experiencia: 3, correo: 'viviana@gmail.com', especialidad: 'Servidores públicos' },
        { id: 'a3', nombre: 'Ana María Castillo', rol: 'analista', experiencia: 9, correo: 'viviana@gmail.com', especialidad: 'Mujeres' },
        { id: 'a4', nombre: 'Luis Alfredo Ramirez Méndez', rol: 'analista', experiencia: 3, correo: 'viviana@gmail.com', especialidad: 'Servidores públicos' },
        { id: 'a5', nombre: 'Ana María Castillo', rol: 'analista', experiencia: 9, correo: 'viviana@gmail.com', especialidad: 'Mujeres' },
        { id: 'a6', nombre: 'Luis Alfredo Ramirez Méndez', rol: 'analista', experiencia: 3, correo: 'viviana@gmail.com', especialidad: 'Servidores públicos' },
        { id: 'a7', nombre: 'Ana María Castillo', rol: 'analista', experiencia: 9, correo: 'viviana@gmail.com', especialidad: 'Mujeres' },
        { id: 'a8', nombre: 'Luis Alfredo Ramirez Méndez', rol: 'analista', experiencia: 3, correo: 'viviana@gmail.com', especialidad: 'Mujeres' },
    ]);

    const [revisores] = useState<Persona[]>([
        { id: 'r1', nombre: 'Carlos Arturo Estupiñan', rol: 'revisor', experiencia: 4, correo: 'viviana@gmail.com', especialidad: 'UP-PCC' },
        { id: 'r2', nombre: 'Sofía Alejandra Sanchez', rol: 'revisor', experiencia: 6, correo: 'viviana@gmail.com', especialidad: 'Poblaciones' },
        { id: 'r3', nombre: 'Carlos Arturo Estupiñan', rol: 'revisor', experiencia: 4, correo: 'viviana@gmail.com', especialidad: 'UP-PCC' },
        { id: 'r4', nombre: 'Sofía Alejandra Sanchez', rol: 'revisor', experiencia: 6, correo: 'viviana@gmail.com', especialidad: 'Poblaciones' },
        { id: 'r5', nombre: 'Carlos Arturo Estupiñan', rol: 'revisor', experiencia: 4, correo: 'viviana@gmail.com', especialidad: 'UP-PCC' },
        { id: 'r6', nombre: 'Sofía Alejandra Sanchez', rol: 'revisor', experiencia: 6, correo: 'viviana@gmail.com', especialidad: 'Poblaciones' },
        { id: 'r7', nombre: 'Carlos Arturo Estupiñan', rol: 'revisor', experiencia: 4, correo: 'viviana@gmail.com', especialidad: 'UP-PCC' },
        { id: 'r8', nombre: 'Sofía Alejandra Sanchez', rol: 'revisor', experiencia: 6, correo: 'viviana@gmail.com', especialidad: 'Poblaciones' },
    ]);

    const [analistaSeleccionado, setAnalistaSeleccionado] = useState<Persona | null>(null);
    const [revisorSeleccionado, setRevisorSeleccionado] = useState<Persona | null>(null);
    const [duplasPendientes, setDuplasPendientes] = useState<Dupla[]>([]);
    const [draggingPersona, setDraggingPersona] = useState<Persona | null>(null);
    const [indiceAnimado, setIndiceAnimado] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleVerDuplas = () => {
        console.log('Duplas confirmadas:', duplasPendientes);
        toast.success('Duplas enviadas correctamente');
        setTimeout(() => {
            navigate('/');
        }, 2000); // Espera 2 segundos antes de redirigir
    };

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
        const nuevaDupla = { analista, revisor, match };
        setDuplasPendientes(prev => {
            const nuevasDuplas = [...prev, nuevaDupla];
            setIndiceAnimado(nuevasDuplas.length - 1); // índice de la nueva dupla
            return nuevasDuplas;
        });
        setAnalistaSeleccionado(null);
        setRevisorSeleccionado(null);
    };

    const desestimarDupla = () => {
        setAnalistaSeleccionado(null);
        setRevisorSeleccionado(null);
    };

    function calcularCompatibilidad(a: Persona, r: Persona): number {
        const diferencia = Math.abs(a.experiencia - r.experiencia);
        const compatibilidad = Math.max(0, 100 - diferencia * 10);
        return compatibilidad;
    }

    return (
        <VentanaLienzo items={breadcrumbItems}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="col-xl-9">
                    <Encabezado
                        subtitle={"Subdirección de Evaluación de Riesgo"}
                    ></Encabezado>
                    <div style={{ height: 'calc(100vh - 200px)' }}>
                        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                            <div className="row" style={{ height: '60%' }}>
                                <div className="col-md-4" style={{ height: '100%', overflow: 'hidden' }}>
                                    <div style={{
                                        border: '1px solid gainsboro',
                                        borderRadius: '10px',
                                        padding: '1rem 1.7rem',
                                        marginBottom: '1.5rem',
                                        backgroundColor: '#303d50',
                                    }}>
                                        <span style={{ color: 'white', fontWeight: '600', fontSize: '18px' }}>Analistas de riesgo</span>
                                    </div>
                                    <div style={{ height: 'calc(100% - 100px)' }}>
                                        <ListaAnalistas analistas={analistas} />
                                    </div>
                                </div>
                                <div className="col-md-4" style={{ height: '100%' }}>
                                    <div style={{
                                        border: '1px solid gainsboro',
                                        borderRadius: '10px',
                                        padding: '1rem 1.7rem',
                                        marginBottom: '1.5rem',
                                        backgroundColor: '#303d50',
                                    }}>
                                        <span style={{ color: 'white', fontWeight: '600', fontSize: '18px' }}>Asignación de duplas</span>
                                    </div>
                                    <div style={{ height: 'calc(100% - 100px)', padding: '2.5rem' }}>
                                        <PanelDuplas
                                            analista={analistaSeleccionado}
                                            revisor={revisorSeleccionado}
                                            onConfirmarDupla={confirmarDupla}
                                            onDesestimarDupla={desestimarDupla}
                                            draggingPersona={draggingPersona}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4" style={{ height: '100%', overflow: 'hidden' }}>
                                    <div style={{
                                        border: '1px solid gainsboro',
                                        borderRadius: '10px',
                                        padding: '1rem 1.7rem',
                                        marginBottom: '1.5rem',
                                        backgroundColor: '#303d50',
                                    }}>
                                        <span style={{ color: 'white', fontWeight: '600', fontSize: '18px' }}>Revisores de calidad</span>
                                    </div>
                                    <div style={{ height: 'calc(100% - 100px)' }}>
                                        <ListaRevisores revisores={revisores} />
                                    </div>
                                </div>
                            </div>
                            {duplasPendientes.length > 0 && (
                                <div className="row" style={{ height: '40%', overflow: 'hidden' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
                                        <Subtitulo subtitle="Duplas" icon={FaUserFriends} />
                                        <button
                                            className="btn btn-outline-custom"
                                            onClick={handleVerDuplas}
                                        >
                                            Confirmar duplas
                                        </button>
                                    </div>
                                    <div className="col-12 scroll-invisible" style={{ height: '73%', overflowY: 'auto' }}>
                                        <ul className="list-group">
                                            {duplasPendientes.map((dupla, idx) => {
                                                const compatibilidad = calcularCompatibilidad(dupla.analista, dupla.revisor);
                                                return (
                                                    <li
                                                        key={idx}
                                                        className={`list-group-item ${idx === indiceAnimado ? 'animate__animated animate__fadeInUp' : ''}`}
                                                        style={idx === indiceAnimado ? { animationDuration: '0.6s' } : {}}
                                                    >
                                                        <div className="d-flex justify-content-between align-items-center my-2">
                                                            <div>
                                                                <strong style={{ color: "#477ed1ff" }}>{dupla.analista.nombre}</strong> - <strong style={{ color: "#97466cff" }}>{dupla.revisor.nombre}</strong>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-2">
                                                                {compatibilidad >= 80 && (
                                                                    <>
                                                                        <span>Alta compatibilidad</span>
                                                                        <span>{compatibilidad}%</span>
                                                                        <FaArrowTrendUp className="text-success" size={18} />
                                                                    </>
                                                                )}
                                                                {compatibilidad >= 60 && compatibilidad < 80 && (
                                                                    <>
                                                                        <span>Compatibilidad media</span>
                                                                        <span>{compatibilidad}%</span>
                                                                        <FaArrowRightArrowLeft className="text-warning" size={18} />
                                                                    </>
                                                                )}
                                                                {compatibilidad < 60 && (
                                                                    <>
                                                                        <span>Baja compatibilidad</span>
                                                                        <span>{compatibilidad}%</span>
                                                                        <FaArrowTrendDown className="text-danger " size={18} />
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            <ToastContainer position="top-right" autoClose={1500} />
                            <DragOverlay>
                                {draggingPersona ? (
                                    <div
                                        className="card p-3 shadow d-flex flex-row align-items-center gap-3 animate__animated animate__fadeIn"
                                        style={{
                                            minWidth: '250px',
                                            backgroundColor: '#ffffff',
                                            border: `2px solid ${draggingPersona.rol === 'analista' ? '#477ed1ff' : '#97466cff'
                                                }`,
                                            color: draggingPersona.rol === 'analista' ? '#477ed1ff' : '#97466cff',
                                        }}
                                    >
                                        {/* Ícono por rol */}
                                        <div style={{ fontSize: '1.8rem' }}>
                                            {draggingPersona.rol === 'analista' ? <FaUserEdit /> : <FaUserCheck />}
                                        </div>
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
                </div>
            </div>
        </VentanaLienzo>
    );
};

export default AsignacionDuplas;