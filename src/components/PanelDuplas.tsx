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
            <div style={{ display: 'flex', height: '100%', alignItems: 'stretch', flexDirection:'column' }}>
                <div style={{display:'flex'}}>
                    <div
                        ref={refAnalista}
                        className={`p-3 mb-3 bg-white ${analista ? 'animate__animated animate__fadeIn' : ''}`}
                        style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <span style={{
                                fontSize: '18px',
                                fontWeight:'bold',
                                color:
                                    analista
                                        ? '#444444ff' // asignado
                                        : draggingPersona?.rol === 'analista'
                                            ? '#444444ff' // arrastrando
                                            : '#44444444' // sin asignar
                            }}>Analista</span>
                        <FaUser
                            style={{
                                fontSize: '70px',
                                color:
                                    analista
                                        ? '#477ed1ff' // asignado
                                        : draggingPersona?.rol === 'analista'
                                            ? '#477ed1ff' // arrastrando
                                            : '#44444444' // sin asignar
                            }}
                        />

                        <div
                            style={{
                                fontWeight:'bold',
                                textAlign:'center',
                                color:
                                    analista
                                        ? '#477ed1ff' // asignado
                                        : draggingPersona?.rol === 'analista'
                                            ? '#477ed1ff' // arrastrando
                                            : '#44444444' // sin asignar
                            }}>
                            {analista ? analista.nombre : ''}
                        </div>
                    </div>


                    <div ref={refRevisor}
                        className={` p-3 mb-3 bg-white ${analista ? 'animate__animated animate__fadeIn' : ''}`}
                        style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '1.5rem' }}>
                        <span style={{
                                fontSize: '18px',
                                fontWeight:'bold',
                                color:
                                    revisor
                                        ? '#444444ff'
                                        : draggingPersona?.rol === 'revisor'
                                            ? '#444444ff'
                                            : '#44444444'
                            }}>
                                Revisor
                        </span>
                        <FaUser
                            style={{
                                fontSize: '70px',
                                color:
                                    revisor
                                        ? '#97466cff'
                                        : draggingPersona?.rol === 'revisor'
                                            ? '#97466cff'
                                            : '#44444444'
                            }}
                        />

                        <div style={{
                            fontWeight:'bold',
                            textAlign:'center',
                            color:
                                revisor
                                    ? '#97466cff'
                                    : draggingPersona?.rol === 'revisor'
                                        ? '#97466cff'
                                        : '#44444444'
                        }}>
                            {revisor ? revisor.nombre : ''}
                        </div>

                    </div>
                </div>


                {analista && revisor ? (
                    <DuplaPreview analista={analista} revisor={revisor} onConfirm={onConfirmarDupla} onDesestimar={onDesestimarDupla} />
                ):
                (
                    <div
                    style={{color:'#44444444', textAlign:'center', fontSize:'18px', fontWeight:'bold', marginTop:'2rem'}}
                    >
                        Arrastra aquí a un analista y a un revisor</div>
                )}
            </div>
        </>

    );
};

export default PanelDuplas;
