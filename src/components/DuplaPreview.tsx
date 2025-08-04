import type { Persona } from '../utils/types';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const DuplaPreview = ({
    analista,
    revisor,
    onConfirm,
    onDesestimar,
}: {
    analista: Persona;
    revisor: Persona;
    onConfirm: (a: Persona, r: Persona) => void;
    onDesestimar: () => void;
}) => {
    const match = Math.abs(analista.experiencia - revisor.experiencia) <= 2;

    return (
        <div className="alert-info animate__animated animate__fadeInDown"
            style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                alignItems: 'center',
            }}>
            {/* <p>
                <strong>Dupla:</strong> {analista.nombre} + {revisor.nombre}
            </p> */}
            <p className="d-flex align-items-center gap-2">
                {match ? (
                    <>
                        <FaCheckCircle style={{ color: '#0cb452ff' }} />
                        <span style={{ color: '#0cb452ff' }}>Match</span>
                    </>
                ) : (
                    <>
                        <FaTimesCircle style={{ color: '#df1818ff' }} />
                        <span style={{ color: '#df1818ff' }} >No Match</span>
                    </>
                )}
            </p>
            <div className="d-flex gap-2" style={{ width: '100%' }}>
                <button className="btn btn-outline-primary" onClick={() => onConfirm(analista, revisor)} style={{ width: '100%' }}>
                    Confirmar Dupla
                </button>
                <button className="btn btn-outline-danger" onClick={onDesestimar} style={{ width: '100%' }}>
                    Desestimar Dupla
                </button>
            </div>
        </div>
    );
};

export default DuplaPreview;

