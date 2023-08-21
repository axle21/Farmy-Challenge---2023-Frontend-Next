"use client";
import styles from "@/styles/SaladToOrder.module.css";
import useFetchData from "@/hooks/useFetchData";
import { isEmpty } from "lodash";

const apiEndpoints = ["ingredients", "suppliers"];

export const SaladOrder = () => {
  //  custom Hooks get saladList
  const { saladData, setSaladData, errors, loading } =
    useFetchData(apiEndpoints);

  return (
    <div className={styles.container}>
      <div className={styles.action}>
        <h1 className={styles.title}>Supplier to Order</h1>
      </div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Products to Order</th>
            <th className={styles.tableHeader}>Total Units</th>
          </tr>
        </thead>
        <tbody>
          {saladData["suppliers"]?.map((salad) => {
            const { id, name, productsToOrder } = salad;
            return (
              <tr key={id}>
                <td className={styles.tableCell}>{name}</td>
                <td className={styles.tableCell}>
                  {!isEmpty(productsToOrder) &&
                    productsToOrder.map((data, idx) => {
                      const ingredient = saladData["ingredients"].find(
                        (ingredient) => ingredient.id === data
                      );
                      return (
                        <span key={idx}>
                          {idx === 0 ? "" : ","} {ingredient?.name}
                        </span>
                      );
                    })}
                </td>
                <td className={styles.tableCell}>
                  {isEmpty(productsToOrder)
                    ? 0
                    : `${productsToOrder?.length} Units`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SaladOrder;
