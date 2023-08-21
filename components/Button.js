import Image from "next/image";
import styles from "@/styles/Button.module.css";

const Button = ({ title, handleClick, submitting, type, customBtnStyle }) => (
  <button
    type={type || "button"}
    disabled={submitting || false}
    className={styles.button}
    onClick={handleClick}
    style={customBtnStyle} // Add the inline style here
  >
    {title}
  </button>
);

export default Button;
