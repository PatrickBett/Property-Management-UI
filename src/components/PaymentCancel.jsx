import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <FaTimesCircle size={80} color="red" />
                <h2 style={styles.title}>Payment Cancelled</h2>
                <p style={styles.message}>
                    Your payment was not completed. Please try again.
                </p>
                <button style={styles.button} onClick={() => navigate("/")}>
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff5f5", // Light red background
    },
    card: {
        textAlign: "center",
        padding: "30px",
        border: "2px solid red",
        borderRadius: "10px",
        backgroundColor: "#f8d7da", // Slightly darker red for the card
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
        color: "red",
        marginTop: "10px",
        fontSize: "24px",
    },
    message: {
        color: "#333",
        fontSize: "16px",
        marginTop: "5px",
    },
    button: {
        marginTop: "15px",
        padding: "10px 20px",
        fontSize: "16px",
        color: "white",
        backgroundColor: "red",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default PaymentCancel;
