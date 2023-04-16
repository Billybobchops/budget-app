import classes from './BudgetMessage.module.css';
import Skeleton from 'react-loading-skeleton';
import { useAuth } from '../../../hooks/useAuth';

const BudgetMessage = () => {
  const { user: isLoggedIn } = useAuth();

  const containerClass = isLoggedIn
    ? classes.container
    : classes.containerLoading;

  return (
    <>
      {isLoggedIn ? (
        <div className={containerClass}>
          <div className={classes.messageTitle}>
            <h2>Congrats!</h2>
          </div>
          <div className={classes.background}>
            <p className={classes.message}>
              You are currently $xx.xx under budget!
            </p>
          </div>
        </div>
      ) : (
        <Skeleton
          borderRadius={0}
          containerClassName={classes.skeleton}
          height={100}
        />
      )}
    </>
  );
};

export default BudgetMessage;
