import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import CardItem from "./cardItem";
import { FaUserCog } from "react-icons/fa";

const Home: React.FC = () => {
    const navigate = useNavigate();

    const options = [
        {
            id: 1,
            title: "Administrador SER",
            description: "Gestión administrativa de la Subdirección de Evaluación de Riesgo",
            icon: <FaUserCog size={40} color="#3085d6" />,
            color: "#e1efff",
            route: "/ser/admin/asignacion-duplas",
        },
    ];

    return (
        <div className="containerHome">
            <div className={`gridHome ${options.length === 1 ? "singleCard" : ""}`}>
                {options.map((option) => (
                    <CardItem key={option.id} {...option} onClick={() => navigate(option.route)} />
                ))}
            </div>

        </div>
    );
};

export default Home;