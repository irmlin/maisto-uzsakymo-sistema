/**@jsxRuntime classic*/
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";
import { UserContext } from "../Contexts/UserContext";
import { useContext } from "react";
import { ROLES } from "../Enums/Enums";

const Buttons = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(UserContext);

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      { userRole !== ROLES.RESTAURANT && <StyledButton
        onClick={() => navigate("/")}
      >
        Restoranai
      </StyledButton>
      }
      <StyledButton
        onClick={() => navigate("/profile")}
      >
        Profilis
      </StyledButton>
      { userRole === ROLES.RESTAURANT && <StyledButton
        onClick={() => navigate("/dishes")}
      >
        Patiekalai
      </StyledButton>
      }
      <StyledButton
        onClick={() => navigate("/order_history")}
      >
        Užsakymų istorija
      </StyledButton>
      

    </div>
  );
};

export default Buttons;
