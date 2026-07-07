import { useNavigate } from "react-router-dom";

function Page1() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <button
                className="btn"
                onClick={() => navigate("/page2")}
            >
                Page1
            </button>
        </div>
    );
}

export default Page1;