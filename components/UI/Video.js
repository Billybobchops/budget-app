import classes from "./Video.module.css";

const Video = () => {
  return (
    <video loop autoPlay={true} muted className={classes.video}>
      <source
        src={"/pexels-tima-miroshnichenko-5561496.mp4"}
        type="video/mp4"
      />
    </video>
  );
};

export default Video;