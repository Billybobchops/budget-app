import classes from "./BudgetCategory.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Table = (props) => {
  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

const BudgetCategory = (props) => {
  return (
    <Table>
      <tr>
        <td className={classes.head1}>
          <FontAwesomeIcon icon={faChevronDown} className={classes.chevron} />
        </td>
        <td className={classes.head2}>
          <div className={classes.title}>
            {props.categoryTitle} -
            <span className={classes.percentage}> xx% of Income</span>
          </div>
        </td>
        <td className={classes.head3}>
          <div className={classes.flex}>
            <div className={classes.spent}>
              <span className={classes.bold}>Spent</span> $123.43
            </div>
            <div className={classes.slash}>/</div>
            <div className={classes.budgeted}>$1,000.43</div>
          </div>
        </td>
        <td className={classes.head4}>
          <div className={classes.under}>Under $567</div>
        </td>
        <td className={classes.head5}>
          <FontAwesomeIcon icon={faEllipsisH} />
        </td>
      </tr>
    </Table>
  );
};

export default BudgetCategory;
