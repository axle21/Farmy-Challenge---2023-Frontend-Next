import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "@/styles/SortableItem.module.css";

const SortableItem = ({ item, ingredientList }) => {
  const findIngredients = ingredientList.find((data) => data.id === item.id);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={styles.sortableItem}
      style={style}
      {...attributes}
      {...listeners}
    >
      {findIngredients.name}
    </div>
  );
};

export default SortableItem;
