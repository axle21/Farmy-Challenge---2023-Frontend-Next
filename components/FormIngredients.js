import Image from "next/image";
import styles from "@/styles/FormIngredients.module.css";
import Dropdown from "./Dropdown";
import { isEmpty } from "lodash";

const calculateTotal = (ingredients, ingredientsList, property) => {
  let num = 0;
  if (!ingredients) return 0;

  ingredients.forEach((field) => {
    const { selectedOption, servings } = field;
    if (!isEmpty(selectedOption)) {
      const filterIngredient = ingredientsList?.find(
        (ingredient) => ingredient.id === selectedOption?.value
      );
      num += filterIngredient
        ? filterIngredient[`${property}PerServing`] * servings
        : 0;
    }
  });

  return num ? (property === "cost" ? num.toFixed(2) : num) : 0;
};

const FormIngredients = ({
  ingredients,
  ingredientsList,
  handleSetIngredient,
  handleStateChange,
}) => {
  const handleDropdownChange = (index, selectedOption) => {
    const updatedFields = [...ingredients];
    updatedFields[index].selectedOption = selectedOption;
    handleSetIngredient(updatedFields);
  };

  const handleServingsChange = (index, servings) => {
    const updatedFields = [...ingredients];
    updatedFields[index].servings = servings;
    handleSetIngredient(updatedFields);
    handleStateChange(
      "price",
      calculateTotal(updatedFields, ingredientsList, "cost")
    );
  };

  const handleAddField = () => {
    handleSetIngredient([
      ...ingredients,
      { id: crypto.randomUUID(), selectedOption: null, servings: 0 },
    ]);
  };

  const handleDeleteField = (index) => {
    const updatedFields = ingredients.filter((_, i) => i !== index);
    handleSetIngredient(updatedFields);
    handleStateChange(
      "price",
      calculateTotal(updatedFields, ingredientsList, "cost")
    );
  };

  const filteredIngredients = ingredientsList?.filter((data) => {
    return !ingredients.some(
      (dates) => dates.selectedOption?.value === data.id
    );
  });

  return (
    <div className={styles.form_ingredients_container}>
      <div className={styles.total_container}>
        <p>
          Total Cost : {calculateTotal(ingredients, ingredientsList, "cost")}€
        </p>
        <p>
          Total Weight :{calculateTotal(ingredients, ingredientsList, "weight")}
          g
        </p>
      </div>
      <div className={styles.ingredient_container}>
        {ingredients.map((field, index) => {
          const { selectedOption, servings } = field;
          const { value } = selectedOption || {};

          const filterIngredient = ingredientsList.find(
            (ingredient) => ingredient.id === value
          );

          const getGrams = filterIngredient?.weightPerServing * servings || 0;

          const getCost = (
            filterIngredient?.costPerServing * servings || 0
          ).toFixed(2);

          return (
            <div key={field.id} className={styles.dynamic_field}>
              <div className={styles.dropdown_container}>
                <Dropdown
                  options={filteredIngredients.map((ingredient) => ({
                    value: ingredient.id,
                    label: ingredient.name,
                  }))}
                  value={selectedOption}
                  onChange={(selectedOption) =>
                    handleDropdownChange(index, selectedOption)
                  }
                  isSearchable
                />
              </div>

              <div className={styles.servings_container}>
                <p className={styles.servings_text}>Servings:</p>
                <div className={styles.servings_input_container}>
                  <input
                    className={styles.form_field_input}
                    value={servings}
                    onChange={(e) =>
                      handleServingsChange(index, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className={styles.servings_btn}
                    onClick={() => handleServingsChange(index, servings + 1)}
                  >
                    <Image
                      src="/Images/plus.svg"
                      width={14}
                      height={14}
                      alt="plus icon"
                    />
                  </button>
                  <button
                    type="button"
                    className={styles.servings_btn}
                    onClick={() =>
                      handleServingsChange(index, Math.max(0, servings - 1))
                    }
                  >
                    <Image
                      src="/Images/minus.svg"
                      width={14}
                      height={14}
                      alt="minus icon"
                    />
                  </button>
                </div>
                <p className={styles.servings_unit}>{getGrams}g</p>
                <p className={styles.servings_fraction}>{getCost}€</p>
              </div>

              <button
                type="button"
                className={styles.delete_button}
                onClick={() => handleDeleteField(index)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className={styles.add_ingredients_btn}
        onClick={handleAddField}
      >
        <Image src="/Images/plus.svg" width={24} height={24} alt="plus icon" />
      </button>
    </div>
  );
};

export default FormIngredients;
