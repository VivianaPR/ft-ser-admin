import type { Persona } from '../utils/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";

const ListaAnalistas = ({ analistas }: { analistas: Persona[] }) => {
    const [filtro, setFiltro] = useState(''); /* hook -- Control de cambios - obs*/

    const analistasFiltrados = analistas.filter(a =>
        a.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    const limpiarFiltro = () => setFiltro('');

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
            {/* Buscador fijo */}
            <div className="position-relative mb-3">
                <input
                    type="text"
                    className="form-control pe-5"
                    placeholder="Buscar analista..."
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                />
                {filtro && (
                    <button
                        type="button"
                        onClick={limpiarFiltro}
                        className="btn position-absolute end-0 top-50 translate-middle-y me-2 p-0 border-0 bg-transparent text-muted"
                        style={{ fontSize: '1.2rem' }}
                        aria-label="Limpiar búsqueda"
                    >
                        <MdOutlineCancel />
                    </button>
                )}
            </div>

            {/* Lista scrollable */}
            <div
                className="scroll-invisible"
                style={{
                    overflowY: 'auto',
                    flexGrow: 1,
                }}
            >
                {analistasFiltrados.map(a => (
                    <DraggableCard key={a.id} persona={a} />
                ))}
            </div>
        </div>

    );
};

const DraggableCard = ({ persona }: { persona: Persona }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: persona.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="card mb-2 px-3 py-2 bg-primary column"
            style={style}
        >
            <strong>
                {persona.nombre}
            </strong>
            <span>
                {persona.experiencia} años
            </span>
            <span>
                {persona.especialidad}
            </span>
        </div>
    );
};

export default ListaAnalistas;
