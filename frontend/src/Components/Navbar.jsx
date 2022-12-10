/**@jsxRuntime classic */
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import Buttons from "./Buttons";
import {MenuItem, Select} from "@mui/material";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";
import DEFAULT_USERS from "../TempData/UserData";

const Navbar = () => {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
  const { userRole, setUserRole, setUserData } = useContext(UserContext);

  const onUserRoleChange = (event) => {
    setUserRole(event.target.value);
    const roleKey = Object.keys(ROLES).find(key => ROLES[key] === event.target.value);
    setUserData(DEFAULT_USERS[roleKey]);
  }

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
        <a href={"/login"}><h3 className="dwu">Prisijungti</h3></a>
        <a href={"/register"}><h3 className="dwu">Registruotis</h3></a>
        <Select
          size="small"
          id="temp-role-select"
          value={userRole}
          label="Peržiūrėti kaip"
          onChange={onUserRoleChange}
        >
          {
            Object.values(ROLES).map(item => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
            ))
          }
        </Select>
      </div>
    </div>
  );
};

export default Navbar;
