import classes from './CategoryPieCards.module.css';

const CategoryPieCards = ({ categories, colors }) => {
  return (
    <div className={classes.cardsContainer}>
      {categories.map((category, index) => {
        return (
          <div className={classes.pieCard} key={category.id}>
            <div style={{ backgroundColor: colors[index] }}></div>
            <h4 className={classes.title}>{category.id}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPieCards;
