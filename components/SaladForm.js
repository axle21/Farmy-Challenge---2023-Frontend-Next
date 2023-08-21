"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/SaladForm.module.css";
import FormIngredients from "./FormIngredients";
import Button from "./Button";
import { isEmpty } from "lodash";
import useSaladFormSubmit from "@/hooks/useSaladFormSubmit";
import Dropdown from "./Dropdown";

const buildDataForIngredients = (formIngredients, ingredientList) => {
  if (isEmpty(formIngredients) || isEmpty(ingredientList)) return [];

  return formIngredients.map((data) => {
    const ingredient = ingredientList.find((_data) => data.id === _data.id);

    return {
      id: crypto.randomUUID(),
      selectedOption: { value: ingredient?.id, label: ingredient?.name },
      servings: data?.numOfServings,
    };
  });
};

const SaladForm = ({
  handleClose,
  handleSetSaladList,
  editSaladData,
  ingredientList,
  businessLogic,
  suppliers,
}) => {
  const [form, setForm] = useState({
    id: editSaladData?.id || null,
    name: editSaladData?.name || "",
    size: editSaladData?.size || "",
    cost: editSaladData?.cost || 0.0,
    cost: editSaladData?.price || 0.0,
    ingredients: editSaladData?.ingredients || [],
  });

  const { submitForm, isSubmitting, error } = useSaladFormSubmit(
    handleSetSaladList,
    ingredientList,
    suppliers
  );
  const [ingredients, setIngredients] = useState([]);

  const saladTypesOption = Object.keys(businessLogic.saladTypes || []);

  const selectedSaladTypeInfo = () => {
    const selectedType = businessLogic.saladTypes?.[form.size];

    if (selectedType) {
      return `${selectedType.targetCost}€ / ${selectedType.targetWeight}g `;
    }
    return "-";
  };

  const handleStateChange = (fieldName, value) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleSetIngredients = (values) => {
    setIngredients(values);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formValues = {
      ...form,
      ingredients,
    };
    await submitForm(formValues);
    handleClose();
  };

  //use to update the ingredients from the edit data passed
  useEffect(() => {
    setIngredients(buildDataForIngredients(form.ingredients, ingredientList));
  }, [ingredientList]);

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.salad_and_type_container}>
        <input
          type="text"
          placeholder="Salad Name"
          required
          autoFocus
          value={form.name}
          className={styles.form_field_input}
          onChange={(e) => handleStateChange("name", e.target.value)}
        />

        <Dropdown
          placeholder="Select Size"
          options={saladTypesOption.map((option) => ({
            value: option,
            label: option,
          }))}
          value={
            !isEmpty(form?.size) && {
              value: form.size,
              label: form.size,
            }
          }
          onChange={(e) => handleStateChange("size", e.value)}
        />
      </div>
      <hr className={styles.hr} />
      <p>Target Cost/Weight: {selectedSaladTypeInfo()}</p>

      {ingredients && (
        <FormIngredients
          ingredients={ingredients}
          ingredientsList={ingredientList}
          handleSetIngredient={handleSetIngredients}
          handleStateChange={handleStateChange}
        />
      )}
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
        />
      </div>
    </form>
  );
};

export default SaladForm;
