/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { motion } from "framer-motion";

const SimplePageContent = ({children}) => {

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="MenuItems container"
      variants={container}
      initial="hidden"
      animate="visible"
      css={css`
        margin-top: 30px;
        padding: 40px 20px;
        background: #fff;
        border-radius: 50px;
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
      `}
    >
      {children}
    </motion.div>
  );
};

export default SimplePageContent;
