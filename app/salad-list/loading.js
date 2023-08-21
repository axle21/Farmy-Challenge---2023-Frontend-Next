import styles from "@/styles/Loading.module.css";

function Loading() {
  return (
    <div className={styles.loading_container}>
      <div className={styles.chaotic_orbit} />
    </div>
  );
}

export default Loading;
