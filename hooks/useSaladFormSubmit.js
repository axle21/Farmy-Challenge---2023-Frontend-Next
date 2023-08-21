"use client";
import { useState } from "react";

//UPDATE SUPPLIERS DATA BASE FROM THE ORDERED INGDREDIENTS
const updateSuppliersWithSelectedIngredients = (
  selectedIngredients,
  ingredients,
  suppliers
) => {
  const ingredientSupplierMap = new Map(
    ingredients.map((ingredient) => [ingredient.id, ingredient.supplierId])
  );

  selectedIngredients?.forEach((selectedIngredient) => {
    const ingredientId = selectedIngredient.id;
    const supplierId = ingredientSupplierMap.get(ingredientId);

    const supplier = suppliers.find((supplier) => supplier.id === supplierId);
    if (supplier && !supplier.productsToOrder.includes(ingredientId)) {
      supplier.productsToOrder.push(ingredientId);
    }
  });

  return suppliers;
};

const sendApiRequests = async (
  saladFormValues,
  supplierValues,
  handleSetSaladList,
  setSubmitting
) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const requestPromises = [
    fetch("./api/salads", {
      ...requestOptions,
      body: JSON.stringify(saladFormValues),
    }),
    fetch("./api/suppliers", {
      ...requestOptions,
      body: JSON.stringify(supplierValues),
    }),
  ];

  try {
    const responses = await Promise.all(requestPromises);

    // Check responses for errors
    const responseData = [];

    for (const response of responses) {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      responseData.push(await response.json());
    }

    // Handle the responseData as needed
    const [data1, data2] = responseData;
    handleSetSaladList(data1);
    // handleSetSaladList(data2);
  } catch (error) {
    setError(error);
  } finally {
    setSubmitting(false);
  }
};
//GET THE LOWEST FRESHNESS FROM THE INGREDIENT LIST
const getLowestHours = (ingredients, ingredientList) => {
  const selectedOptionValues = ingredients.map(
    (ingredient) => ingredient.selectedOption?.value
  );

  const lowestHoursFreshItem = ingredientList
    .filter((ingredient) => selectedOptionValues.includes(ingredient.id))
    .reduce((minItem, currentItem) =>
      currentItem.hoursFresh < minItem.hoursFresh ? currentItem : minItem
    );

  return lowestHoursFreshItem?.hoursFresh || 0;
};

const useSaladFormSubmit = (handleSetSaladList, ingredientList, suppliers) => {
  const [error, setError] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const submitForm = async (formValues) => {
    const { ingredients, ...form } = formValues;

    try {
      setSubmitting(true);

      const selectedIngredients = ingredients
        .map(({ selectedOption, servings }) => ({
          id: selectedOption?.value,
          numOfServings: servings,
        }))
        .filter(({ numOfServings }) => numOfServings !== 0);

      const saladFormValues = {
        ...form,
        cost: 0,
        hoursFresh: getLowestHours(ingredients, ingredientList),
        ingredients: selectedIngredients,
      };

      const supplierValues = updateSuppliersWithSelectedIngredients(
        selectedIngredients,
        ingredientList,
        suppliers
      );

      sendApiRequests(
        saladFormValues,
        supplierValues,
        handleSetSaladList,
        setSubmitting
      );
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return { submitForm, isSubmitting, error };
};

export default useSaladFormSubmit;
