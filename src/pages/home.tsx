import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <button
                className="btn"
                onClick={() => navigate("/page1")}
            >
                Let's Enter
            </button>
        </div>
    );
}

export default Home;