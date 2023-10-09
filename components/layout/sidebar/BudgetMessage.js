import classes from './BudgetMessage.module.css';
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../../hooks/useAuth';

const BudgetMessage = () => {
  const { user: isLoggedIn } = useAuth();

  const containerClass = isLoggedIn
    ? classes.container
    : classes.containerLoading;

  return (
    <div className={containerClass}>
      {isLoggedIn ? (
        <>
          <div className={classes.messageTitle}>
            <h2>Congrats!</h2>
          </div>
          <div className={classes.background}>
            <p className={classes.message}>
              You are currently $xx.xx under budget!
            </p>
          </div>
        </>
      ) : (
        <Skeleton borderRadius={0} height={100} />
      )}
    </div>
  );
};

export default BudgetMessage;
