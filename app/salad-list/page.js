"use client";
import { useState } from "react";
import styles from "@/styles/SaladList.module.css";
import Button from "@/components/Button";
import useFetchData from "@/hooks/useFetchData";
import Modal from "@/components/Modal";
import SaladForm from "@/components/SaladForm";

import { isEmpty } from "lodash";
import SaladRecipeTool from "@/components/SaladRecipeTool";

import ActionButton from "@/components/ActionButton";

const apiEndpoints = [
  "salads",
  "ingredients",
  "suppliers",
  "businessLogic",
  // Add more API endpoints as needed
];

export const SaladList = () => {
  //  custom Hooks get saladList
  const { saladData, setSaladData, errors, loading } =
    useFetchData(apiEndpoints);
  const [isSaladForm, setIsSaladFormModal] = useState(false);
  const [isSaladRecipeTool, setSaladRecipeTool] = useState(false);
  const [editSaladData, setEditSaladData] = useState({});

  const saladFormModal = () => {
    setIsSaladFormModal(!isSaladForm);
    if (!isSaladForm) {
      setEditSaladData({});
    }
  };

  const recipeToolModal = () => {
    setSaladRecipeTool(!isSaladRecipeTool);
    if (isSaladRecipeTool) {
      setEditSaladData({});
    }
  };

  const handleSetSaladList = (data) => {
    setSaladData({ ...saladData, salads: data });
  };

  const handleEditSalad = (id, property) => {
    const filterSalad = saladData["salads"].find((data) => data.id === id);

    if (property === "saladForm") {
      setIsSaladFormModal(true);
    } else {
      setSaladRecipeTool(true);
    }

    setEditSaladData(filterSalad);
  };

  return (
    <div className={styles.container}>
      {!loading && (
        <>
          <Modal isOpen={isSaladForm} onRequestClose={saladFormModal}>
            <h1 className={styles.title}>
              {!isEmpty(editSaladData) ? "Edit Salad" : "Create Salad"}
            </h1>
            <SaladForm
              handleClose={saladFormModal}
              handleSetSaladList={handleSetSaladList}
              editSaladData={editSaladData}
              ingredientList={saladData["ingredients"] || []}
              businessLogic={saladData["businessLogic"] || []}
              suppliers={saladData["suppliers"] || []}
            />
          </Modal>
          <Modal isOpen={isSaladRecipeTool} onRequestClose={recipeToolModal}>
            <h1 className={styles.title}>Salad Recipe Tool</h1>
            <SaladRecipeTool
              editSaladData={editSaladData}
              ingredientList={saladData["ingredients"] || []}
              handleClose={recipeToolModal}
              handleSetSaladList={handleSetSaladList}
            />
          </Modal>
        </>
      )}

      <div className={styles.action}>
        <h1 className={styles.title}>Salad List</h1>
        <Button title="Create Salad" handleClick={saladFormModal} />
      </div>

      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Size</th>
            <th className={styles.tableHeader}>Price</th>
            <th className={styles.tableHeader}>Freshness hours</th>
            <th className={styles.tableHeader}>Current stock</th>
            <th className={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {saladData["salads"]?.map((salad) => {
            const { id, name, size, price, hoursFresh } = salad;
            return (
              <tr key={id}>
                <td className={styles.tableCell}>{name}</td>
                <td className={styles.tableCell}>{size}</td>
                <td className={styles.tableCell}>{`${price} €`}</td>
                <td className={styles.tableCell}>{hoursFresh}</td>
                <td className={styles.tableCell}>0</td>
                <td className={styles.tableCellAction}>
                  <ActionButton
                    onClick={() => handleEditSalad(id, "saladForm")}
                    iconSrc="/Images/pencil.svg"
                    alt="pencil icon"
                    tooltipContent="Edit Salad"
                    tooltipId={`edit-${id}`}
                  />
                  <ActionButton
                    onClick={() => handleEditSalad(id, "recipeTool")}
                    iconSrc="/Images/salad.svg"
                    alt="salad icon"
                    tooltipContent="Salad Recipe Tool"
                    tooltipId={`salad-tool-${id}`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SaladList;
