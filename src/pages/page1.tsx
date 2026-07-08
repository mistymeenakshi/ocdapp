import { useNavigate } from "react-router-dom";
import bgImage from "../assets/page1.png";

function Page1() {
    const navigate = useNavigate();

    return (
        <div
            className="container"
            style={{
                backgroundImage: `url(${bgImage})`,
            }}
        >
            <h1 className="h1">To Do List !</h1>

            <div className="task-container">
                <ol className="list">
                    <li>Wake up</li>
                    <li>Brush teeth</li>
                    <li>Study React</li>
                    <li>Exercise</li>
                    <li>Wake up</li>
                    <li>Brush teeth</li>
                    <li>Study React</li>
                    <li>Exercise</li>
                    <li>Wake up</li>
                    <li>Brush teeth</li>
                    <li>Study React</li>
                </ol>
            </div>

            <button
                className="btn"
                onClick={() => navigate("/page2")}
            >
                Page2
            </button>

        </div>
    );
}

export default Page1;