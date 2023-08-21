import styles from "./page.module.css";
import ImageCard from "@/components/Cards";

const Home = () => (
  <section className={styles.main}>
    <div className={styles.cardContainerGrid}>
      <ImageCard
        imageUrl="/Images/salad.PNG"
        title="Salad List"
        link="/salad-list"
      />

      <ImageCard
        imageUrl="/Images/supplier.jpg"
        title="Supplier Orders"
        link="/supplier-to-order"
      />
      <ImageCard
        imageUrl="/Images/vegetables-freshness.jpg"
        title="Daily Orders for Freshness"
        link="/salad-list"
      />
      <ImageCard
        imageUrl="/Images/freshness.jpg"
        title="Salad Recipe Tool"
        link="/salad-list"
      />
    </div>
  </section>
);

export default Home;
