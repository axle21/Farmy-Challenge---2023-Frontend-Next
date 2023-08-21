import styles from "@/styles/Header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <Link href="/">
      <h1 className={styles.title}>Mel's Kitchen</h1>
    </Link>
  );
};

export default Header;
