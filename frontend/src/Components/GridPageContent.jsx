/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { motion } from "framer-motion";

const GridPageContent = ({children}) => {

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const breakpoints = [576, 768, 992, 1200];

  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

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

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          ${mq[2]} {
            grid-template-columns: 1fr;
          }
        }

        .header {
          text-align: center;
          padding-bottom: 20px;
        }

        .menu-items {
          padding: 1rem 1.5rem;
          display: flex;
          border: #efefef 1px solid;
          border-top: none;
          ${mq[0]} {
            display: grid;
            img {
              margin-bottom: 10px;
            }
          }

          &:last-child {
            border-bottom: none;
          }

          &:nth-of-type(odd) {
            border-left: none;
            ${mq[2]} {
              border-right: none;
            }
          }

          &:nth-of-type(even) {
            border-right: none;
            ${mq[2]} {
              border-left: none;
            }
          }

          .item-content {
            display: grid;
            padding: 0 1rem;

            p {
              font-size: 0.8rem;
              ${mq[(0, 1)]} {
                font-size: 0.7rem;
              }
            }

            .item-title-box {
              // display: flex;
              // justify-content: space-between;

              .item-title,
              .item-price {
                font-size: 1rem;
                ${mq[(0, 1)]} {
                  font-size: 0.8rem;
                }
              }
            }
          }
        }

        img {
          height: 85px;
          ${mq[(0, 1)]} {
            height: 75px;
          }
          cursor: pointer;
        }
      `}
    >
      {children}
    </motion.div>
  );
};

export default GridPageContent;
