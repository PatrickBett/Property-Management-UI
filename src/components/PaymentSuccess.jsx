import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <FaCheckCircle size={80} color="green" />
                <h2 style={styles.title}>Payment Successful!</h2>
                <p style={styles.message}>Thank you for your payment. Your transaction was successful.</p>
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
        backgroundColor: "#f0fff0", // Light green background
    },
    card: {
        textAlign: "center",
        padding: "30px",
        border: "2px solid green",
        borderRadius: "10px",
        backgroundColor: "#d4edda", // Slightly darker green for the card
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
        color: "green",
        marginTop: "10px",
        fontSize: "24px",
    },
    message: {
        color: "#333",
        fontSize: "16px",
        marginTop: "5px",
    },
};

export default PaymentSuccess;
