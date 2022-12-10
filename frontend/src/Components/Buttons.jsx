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
      <StyledButton
        onClick={() => navigate("/")}
      >
        Restoranai
      </StyledButton>
      
      { userRole !== ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/profile")}
      >
        Profilis
      </StyledButton>
      }
      { userRole === ROLES.RESTAURANT && <StyledButton
        onClick={() => navigate("/dishes")}
      >
        Patiekalai
      </StyledButton>
      }
      { userRole !== ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/order_history")}
      >
        Užsakymų istorija
      </StyledButton>
      }
      { userRole === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/newCouriers")}
      >
        Nauji kurjeriai
      </StyledButton>
      }
      { userRole === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/newSuppliers")}
      >
        Nauji tiekėjai
      </StyledButton>
      }
      { userRole === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/ClientsReports")}
      >
        Klientų ataskaitos
      </StyledButton>
      }
      { userRole === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/SuppliersReports")}
      >
        Tiekėjų ataskaitos
      </StyledButton>
      }
      { userRole === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/CouriersReports")}
      >
        Kurjerių ataskaitos
      </StyledButton>
      }
      { userRole === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/CouriersList")}
      >
        Kurjerių sąrašas
      </StyledButton>
      }
      { userRole === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/SuppliersList")}
      >
        Tiekėjų sąrašas
      </StyledButton>
      }

    </div>
  );
};

export default Buttons;
