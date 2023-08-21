"use client";
import styles from "@/styles/SaladRecipeTool.module.css";
import { useState, useMemo } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import Button from "./Button";
import SortableItem from "./SortableItem";

const SaladRecipeTool = ({
  handleClose,
  editSaladData,
  ingredientList,
  handleSetSaladList,
}) => {
  const { name, size, ingredients } = editSaladData;
  const [isSubmitting, setSubmitting] = useState(false);
  const [items, setItems] = useState(ingredients);
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = async () => {
    const values = { ...editSaladData, ingredients: items };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch("./api/salads", requestOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      handleSetSaladList(data);
      handleClose();
    } catch (error) {
      throw new Error(`Something went wrong: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.recipe_tool_container}>
      <div className={styles.recipe_tool_header}>
        <p className={styles.header_text}>{name}</p>
        <p className={styles.header_text}>{size && size.toUpperCase()}</p>
      </div>
      <hr className={styles.hr} />
      <p className={styles.description}>
        Drag and drop ingredients to arrange salad recipe
      </p>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds}>
          {items.map((item) => (
            <SortableItem
              key={item.id}
              item={item}
              ingredientList={ingredientList}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div className={styles.btn_section}>
        <Button
          title="Close"
          handleClick={handleClose}
          customBtnStyle={{
            borderColor: "#BDBDBD",
            backgroundColor: "#BDBDBD",
          }}
        />
        <Button
          type="submit"
          title={!isSubmitting ? "Save" : "Saving"}
          submitting={isSubmitting}
          handleClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default SaladRecipeTool;
