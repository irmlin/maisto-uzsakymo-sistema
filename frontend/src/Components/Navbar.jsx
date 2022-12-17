/**@jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import Buttons from "./Buttons";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";

export default function Navbar() {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
  const { isAuthenticated, userData } = useContext(UserContext);
  
  return (
    <div
      className="Navbar"
      css={css`
        display: flex;
        justify-content: space-around;

        .logo {
          font-size: 1.8rem;
        }

        ${mq[2]} {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          place-items: center;

          .Buttons {
            grid-row: 2;
            grid-column: 1/4;
          }

          .logo {
            grid-row: 1;
            grid-column: 1/4;
            position: relative;
            bottom: 10px;
            font-size: 3rem;
          }

          .dwu {
            grid-row: 1;
            grid-column: 1/4;
            font-size: 0.9rem;
            position: relative;
            top: 20px;
            font-weight: 400;
            font-size: 1.3rem;
          }
        }
      `}
    >
      <h3 className="logo">Maisto užsakymo sistema</h3>
      <Buttons
        className="Buttons"
      />
      <div style={{width: "10%"}}>
        {
          isAuthenticated ? (
            <div>
              <a href={"/logout"}><h3 className="dwu">Atsijungti</h3></a>
              {
                userData.role === ROLES.ADMINISTRATOR && (
                  <a href={"/register"}><h3 className="dwu">Registracija</h3></a>
                )
              }
            </div>
          ) : (
            <div>
              <a href={"/login"}><h3 className="dwu">Prisijungti</h3></a>
              <a href={"/register"}><h3 className="dwu">Registruotis</h3></a>
            </div>
          )
        }
      </div>
    </div>
  );
};

