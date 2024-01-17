import { getColor } from "../utils";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const Card = ({ item, index, handleClick }) => {
  const { title, poster_path, vote_average, id, name } = item;

  return (
    <motion.div
      onClick={()=>handleClick(id)}
      className="movie"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index%20*0.05,
        ease: "easeInOut",
        duration: 0.8,
      }}
      viewport={{ amount: 0 }}
    >
      <span className={`rating ${getColor(vote_average)}`}>{vote_average}</span>
      <img
        src={
          poster_path
            ? `${import.meta.env.VITE_IMG_URL}${poster_path}`
            : "http://via.placeholder.com/1080x1580"
        }
        alt={title}
        className="poster m"
        id={id}
      />
      <span className="name">{name | title}</span>
    </motion.div>
  );
};

export default Card;
