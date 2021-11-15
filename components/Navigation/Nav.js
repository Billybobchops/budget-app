import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faCreditCard,
  faList,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../public/LogoPlaceholder.png";
import classes from "./Nav.module.css";

const NavLink = (props) => {
  return (
    <li className={classes.listItem}>
      <Link href={props.href} passHref>
        <a className={classes.navLink}>
          <FontAwesomeIcon icon={props.icon} className={classes.icon} />
          {props.linkText}
        </a>
      </Link>
    </li>
  );
};

const Nav = () => {
  return (
    <nav className={classes.navigation}>
      <div className={classes.logo}>
        <Image src={logo} alt="Logo" />
      </div>
      <ul className={classes.list}>
        <NavLink href="/overview" icon={faChartPie} linkText="Overview" />
        <NavLink
          href="/income-and-expenses"
          icon={faCreditCard}
          linkText="Income and Expenses"
        />
        <NavLink href="/planner" icon={faList} linkText="Planner" />
        <NavLink
          href="/sinking-funds-calculator"
          icon={faCalculator}
          linkText="Sinking Funds Calculator"
        />
      </ul>
    </nav>
  );
};

export default Nav;
