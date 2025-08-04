import { useDroppable } from '@dnd-kit/core';
import type { Persona } from '../utils/types';
import DuplaPreview from './DuplaPreview';
import { FaUser } from "react-icons/fa";

const PanelDuplas = ({
    analista,
    revisor,
    onConfirmarDupla,
    onDesestimarDupla,
    draggingPersona
}: {
    analista: Persona | null;
    revisor: Persona | null;
    onConfirmarDupla: (a: Persona, r: Persona) => void;
    onDesestimarDupla: () => void;
    draggingPersona: Persona | null;
}) => {
    const { setNodeRef: refAnalista } = useDroppable({ id: 'drop-analista' });
    const { setNodeRef: refRevisor } = useDroppable({ id: 'drop-revisor' });

    return (
        <>
            <div style={{ display: 'flex', height: 'fit-content' }}>
                <div
                    ref={refAnalista}
                    className={`p-3 mb-3 bg-white ${analista ? 'animate__animated animate__fadeIn' : ''}`}
                    style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1.5rem' }}
                >
                    <strong>Analista</strong>
                    <FaUser
                        style={{
                            fontSize: '60px',
                            color:
                                analista
                                    ? '#4886e4ff' // asignado
                                    : draggingPersona?.rol === 'analista'
                                        ? '#4886e4ff' // arrastrando
                                        : 'grey' // sin asignar
                        }}
                    />

                    <div
                        style={{
                            color:
                                analista
                                    ? '#4886e4ff' // asignado
                                    : draggingPersona?.rol === 'analista'
                                        ? '#4886e4ff' // arrastrando
                                        : 'grey' // sin asignar
                        }}>
                        {analista ? analista.nombre : 'Arrastra un analista aquí'}
                    </div>
                </div>


                <div ref={refRevisor}
                    className={` p-3 mb-3 bg-white ${analista ? 'animate__animated animate__fadeIn' : ''}`}
                    style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1.5rem' }}>
                    <strong>Revisor</strong>

                    <FaUser
                        style={{
                            fontSize: '60px',
                            color:
                                revisor
                                    ? '#bb54d4ff'
                                    : draggingPersona?.rol === 'revisor'
                                        ? '#bb54d4ff'
                                        : 'grey'
                        }}
                    />

                    <div style={{
                            color:
                                revisor
                                    ? '#bb54d4ff'
                                    : draggingPersona?.rol === 'revisor'
                                        ? '#bb54d4ff'
                                        : 'grey'
                        }}>
                        {revisor ? revisor.nombre : 'Arrastra un revisor aquí'}
                    </div>

                </div>
            </div>
            {analista && revisor && (
                <DuplaPreview analista={analista} revisor={revisor} onConfirm={onConfirmarDupla} onDesestimar={onDesestimarDupla} />
            )}
        </>

    );
};

export default PanelDuplas;
