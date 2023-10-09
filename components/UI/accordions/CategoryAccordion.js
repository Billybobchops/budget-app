import classes from './CategoryAccordion.module.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faMinus,
    faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import BudgetItem from '../items/BudgetItem';
import { Droppable } from 'react-beautiful-dnd';

const CategoryAccordion = ({
    categoryTitle,
    percent,
    budgetedTotal,
    totalIncome,
    spent,
    items,
    tabID,
}) => {
    const [isActive, setIsActive] = useState(false);

    let budgeted = budgetedTotal !== undefined ? +budgetedTotal.toFixed(2) : 0;

    if (tabID === 'Annual') {
        budgeted = +(budgeted * 12).toFixed(2);
        totalIncome = totalIncome * 12;
    }

    const percentDisplay =
        percent * 100 <= 1 ? (
            <span className={classes.percentage}>{'< 1%'}</span>
        ) : (
            <span className={classes.percentage}>
                {(percent * 100).toFixed(0)}% of Income
            </span>
        );

    let balanceClass = null;
    let balanceString = null;

    if (spent === budgeted) {
        balanceClass = 'balanced';
        balanceString = `Balanced!`;
    }

    if (spent > budgeted) {
        balanceClass = 'over';
        let num =
            (spent - budgeted) % 1 === 0
                ? spent - budgeted
                : (spent - budgeted).toFixed(2);
        balanceString = `$${num.toLocaleString()} Over`;
    }

    if (spent < budgeted) {
        balanceClass = 'under';
        let num =
            (budgeted - spent) % 1 === 0
                ? budgeted - spent
                : +(budgeted - spent).toFixed(2);
        balanceString = `$${num.toLocaleString()} Under`;
    }

    if (spent === 0 && budgeted === 0) {
        balanceClass = '';
        balanceString = '';
    }

    const activeHandler = () => {
        setIsActive(!isActive);
    };

    const displayKebabOptions = () => {
        console.log('Function separate oh yeah');
    };

    const toggle = isActive ? (
        <FontAwesomeIcon icon={faMinus} className={classes.toggle} />
    ) : (
        <FontAwesomeIcon icon={faPlus} className={classes.toggle} />
    );

    return (
        <>
            <Droppable droppableId={categoryTitle} key={categoryTitle}>
                {(provided, snapshot) => (
                    <div
                        className={`${
                            snapshot.isDraggingOver && classes.backgroundDrag
                        }`}
                    >
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div className={classes.parentContainer}>
                                <div onClick={activeHandler}>
                                    <div className={classes.container}>
                                        <div className={classes.toggle}>
                                            {toggle}
                                        </div>

                                        <div>
                                            <div className={classes.title}>
                                                {categoryTitle}
                                                {totalIncome && percentDisplay}
                                                {!totalIncome && ''}
                                            </div>
                                        </div>

                                        <div className={classes.budgetGridItem}>
                                            <div className={classes.flex}>
                                                <div className={classes.spent}>
                                                    <span className={classes.bold}>
                                                        Spent
                                                    </span>{' '}
                                                    ${spent}
                                                </div>

                                                <div className={classes.slash}>
                                                    /
                                                </div>

                                                <div className={classes.budgeted}>
                                                    ${budgeted.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className={classes[balanceClass]}>
                                                {balanceString}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className={classes.kebab}
                                    onClick={displayKebabOptions}
                                >
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </button>
                            </div>

                            <ul className={classes.list}>
                                {isActive && (
                                    <div className={classes.activeBar}>
                                        <div className={classes.activeBalanceChip}>
                                            <div className={classes[balanceClass]}>
                                                {balanceString}
                                            </div>
                                        </div>

                                        <div className={classes.activeFraction}>
                                            <div className={classes.flex}>
                                                <div className={classes.spent}>
                                                    <span className={classes.bold}>
                                                        Spent
                                                    </span>{' '}
                                                    ${spent}
                                                </div>
                                                <div className={classes.slash}>
                                                    /{' '}
                                                </div>
                                                <div className={classes.budgeted}>
                                                    <span className={classes.bold}>
                                                        Budgeted
                                                    </span>{' '}
                                                    ${budgeted}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {isActive &&
                                    // items !== [] &&
                                    items.map((item, index) => {
                                        return (
                                            <BudgetItem
                                                key={item.id}
                                                index={index}
                                                title={item.id}
                                                date={item.billDate}
                                                budgetedAmount={item.budgetAmount}
                                                tabID={tabID}
                                                accordionType={'category'}
                                            />
                                        );
                                    })}
                                {provided.placeholder}
                            </ul>
                        </div>
                    </div>
                )}
            </Droppable>
        </>
    );
};

export default CategoryAccordion;