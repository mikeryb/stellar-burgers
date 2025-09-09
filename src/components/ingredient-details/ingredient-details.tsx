import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../store';
import { RootState } from 'src/store';
import { TIngredient } from '@utils-types';
import { selectIngredients } from '../../slices/productSlice';


export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useAppSelector(selectIngredients);
  const  { id }  = useParams<{ id: string }>();


  const ingredientData = ingredients.find((c) => c._id === id);


  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
