import React, { useRef, useState } from "react";
import CollapseWrapper from "../common/collapse";
const UseRefExercise = () => {
    const [nameSmall, setNameSmall] = useState("Блок");
    const inputRef = useRef();
    const contentRef = useRef();

    const handleContent = () => {
        if (nameSmall === "Блок") {
            setNameSmall("Текст");
        } else {
            setNameSmall("Блок");
        }
    };
    const handleClickWidth = () => {
        inputRef.current.style.width = "80px";
        inputRef.current.style.height = "150px";
    };
    return (
        <CollapseWrapper title="Упражнение">
            <p className="mt-3">
                У вас есть блок, у которого заданы ширина и высота. Добавьте
                кнопку, при нажатии которой изменятся следующие свойства:
            </p>
            <ul>
                <li>Изменится содержимое блока на &quot;text&quot;</li>
                <li>высота и ширина станут равны 150 и 80 соответственно</li>
            </ul>
            <div
                className="bg-primary d-flex flex-row justify-content-center align-items-center rounded"
                style={{
                    height: 40,
                    width: 60,
                    color: "white"
                }}
                ref={inputRef}
            >
                <small ref={contentRef}>{nameSmall}</small>
            </div>
            <button className="btn btn-secondary" onClick={handleContent}>
                Изменить содержимое
            </button>
            <button className="btn btn-secondary" onClick={handleClickWidth}>
                Изменить размер
            </button>
        </CollapseWrapper>
    );
};

export default UseRefExercise;
