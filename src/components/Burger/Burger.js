import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";

const Burger = (props) => {
  let transfromedIngredients = Object.keys(props.Ingredients)
    .map((igKey) => {
      return [...Array(props.Ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transfromedIngredients.length === 0) {
    transfromedIngredients = <p>Please add Ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transfromedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
