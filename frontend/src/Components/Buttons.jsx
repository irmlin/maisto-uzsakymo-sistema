/**@jsxRuntime classic*/
/**@jsx jsx */
import { css, jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";

const Buttons = () => {
  const navigate = useNavigate();

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <StyledButton
        onClick={() => navigate("/")}
      >
        Restoranai
      </StyledButton>
      <StyledButton
        onClick={() => navigate("/profile")}
      >
        Profilis
      </StyledButton>
      <StyledButton
        onClick={() => navigate("/order_history")}
      >
        Užsakymų istorija
      </StyledButton>
    </div>
  );
};

export default Buttons;
