import styles from "@/styles/Cards.module.css";
import Image from "next/image";
import Link from "next/link";

const Card = ({ imageUrl, title, link }) => {
  return (
    <Link href={link}>
      <div className={styles.card}>
        <Image
          src={imageUrl}
          alt="salad recipe tool"
          height={200}
          width={400}
          priority
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;
