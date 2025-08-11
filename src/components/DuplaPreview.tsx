import type { Persona } from '../utils/types';
import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaArrowRightArrowLeft,
} from 'react-icons/fa6';

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
    
    const diferencia = Math.abs(analista.experiencia - revisor.experiencia);
    const compatibilidad = Math.max(0, 100 - diferencia * 10);
    const esAlta = compatibilidad >= 80;
    const esMedia = compatibilidad >= 60 && compatibilidad < 80;

    const TrendIcon = esAlta
        ? FaArrowTrendUp
        : esMedia
            ? FaArrowRightArrowLeft
            : FaArrowTrendDown;

    const colorClase = esAlta
        ? 'text-success'
        : esMedia
            ? 'text-warning'
            : 'text-danger';

    const etiqueta = esAlta
        ? 'Alta compatibilidad'
        : esMedia
            ? 'Compatibilidad media'
            : 'Baja compatibilidad';

    return (
        <div
            className="alert-info animate__animated animate__fadeInDown"
            style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
                alignItems: 'center',
            }}
        >
            <p className="d-flex align-items-center gap-2">
                <TrendIcon className={colorClase} size={18} />
                <span>
                    {etiqueta} ({compatibilidad}%)
                </span>
            </p>

            <div className="d-flex gap-2" style={{ width: '100%' }}>
                <button
                    className="btn btn-outline-custom"
                    onClick={() => onConfirm(analista, revisor)}
                    style={{ width: '100%' }}
                >
                    Agregar Dupla
                </button>
                <button
                    className="btn btn-outline-danger"
                    onClick={onDesestimar}
                    style={{ width: '100%' }}
                >
                    Desestimar Dupla
                </button>
            </div>
        </div>
    );
};

export default DuplaPreview;



