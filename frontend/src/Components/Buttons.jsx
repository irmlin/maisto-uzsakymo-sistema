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
  const { userData, isAuthenticated } = useContext(UserContext);

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      { userData.role === ROLES.COURIER &&
        <StyledButton
          onClick={() => navigate("/courier-orders")}
        >
          Užsakymai
        </StyledButton>
      }
      { userData.role === ROLES.CLIENT &&
        <StyledButton
          onClick={() => navigate("/")}
        >
          Restoranai
        </StyledButton>
      }
      
      { userData.role !== ROLES.ADMINISTRATOR && isAuthenticated && <StyledButton
        onClick={() => navigate("/profile")}
      >
        Profilis
      </StyledButton>
      }
      { userData.role === ROLES.RESTAURANT && <StyledButton
        onClick={() => navigate("/dishes")}
      >
        Patiekalai
      </StyledButton>
      }
      { userData.role !== ROLES.ADMINISTRATOR && isAuthenticated && <StyledButton
        onClick={() => navigate("/order_history")}
      >
        Užsakymų istorija
      </StyledButton>
      }
      { userData.role === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/newCouriers")}
      >
        Nauji kurjeriai
      </StyledButton>
      }
      { userData.role === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/newSuppliers")}
      >
        Nauji tiekėjai
      </StyledButton>
      }
      { userData.role === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/ClientsReports")}
      >
        Klientų ataskaitos
      </StyledButton>
      }
      { userData.role === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/SuppliersReports")}
      >
        Tiekėjų ataskaitos
      </StyledButton>
      }
      { userData.role === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/CouriersReports")}
      >
        Kurjerių ataskaitos
      </StyledButton>
      }
      { userData.role === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/CouriersList")}
      >
        Kurjerių sąrašas
      </StyledButton>
      }
      { userData.role === ROLES.ADMINISTRATOR && <StyledButton
        onClick={() => navigate("/SuppliersList")}
      >
        Tiekėjų sąrašas
      </StyledButton>
      }

    </div>
  );
};

export default Buttons;
