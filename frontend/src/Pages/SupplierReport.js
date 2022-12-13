import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState} from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField } from "@mui/material";
import SuppliersReports from "../TempData/SupplierReports";
import { motion } from "framer-motion";
import StyledButton from "../Components/StyledButton";
export default function NewCouriers() {
    
    const { userData } = useContext(UserContext);

    const [ filterSort, setFilterSort] = useState("");
    const [ column, setColumn] = useState("");
    const [ filter, setFilter] = useState("");
    const [ sort, setSort] = useState("");

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Tiekėjų ataskaitos
              </motion.h2>
                {
                    userData.role === ROLES.ADMINISTRATOR && (
                        <>
                        <motion.h4>
                            Funkcijos
                          </motion.h4>
                        <Select
                                    size="small"
                                    id="filter-sort"
                                    value={filterSort}
                                    onChange={(event) => {setFilterSort(event.target.value)}}
                                    >          
                                      <MenuItem value="filter">Filtruoti</MenuItem>
                                      <MenuItem value="sort">Rikiuoti</MenuItem>                                    
                                </Select>
                                <Select
                                    size="small"
                                    id="filter-sort"
                                    value={column}
                                    onChange={(event) => {setColumn(event.target.value)}}
                                    >          
                                      <MenuItem value="name">Pavadinimas</MenuItem>
                                      <MenuItem value="orders">Užsakymų skaičius</MenuItem>
                                      <MenuItem value="meals">Patiekalų skaičius</MenuItem>   
                                      <MenuItem value="sum">Uždirbti pinigai</MenuItem>
                                      <MenuItem value="fees">Sumokėti mokesčiai</MenuItem>                              
                                </Select>
                                {filterSort === "filter" && <TextField style={{height: '1px'}}
                                  type="text"
                                  size="small"
                                  required
                                  name="filter"
                                  id="filter"
                                  onChange={event => setFilter(event.target.value)}
                                  value={filter}                                  
                                  />
                                }
                                { filterSort === "filter" && <StyledButton 
                            >
                                Filtruoti
                            </StyledButton>
                                }
                                {filterSort === "sort" && <Select
                                    size="small"
                                    id="sort"
                                    value={sort}
                                    onChange={(event) => {setSort(event.target.value)}}
                                    >          
                                      <MenuItem value="asc">Didėjančia tvarka</MenuItem>
                                      <MenuItem value="desc">Mažėjančia tvarka</MenuItem>                                    
                                </Select>
                                }
                                { filterSort === "sort" && <StyledButton 
                            >
                                Rikiuoti
                            </StyledButton>
                                }
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  Pavadinimas
                                </TableCell>
                                <TableCell>
                                  Užsakymų skaičius
                                </TableCell>
                                <TableCell>
                                  Patiekalų skaičius
                                </TableCell>
                                <TableCell>
                                  Uždirbti pinigai
                                </TableCell>
                                <TableCell>
                                  Sumokėta mokesčių
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                SuppliersReports.reports.map(supplier => (
                                  <TableRow key={supplier.supplierNumber}>
                                    <TableCell>
                                      {supplier.supplierName}
                                    </TableCell>
                                    <TableCell>
                                      {supplier.orders}
                                    </TableCell>
                                    <TableCell>
                                      {supplier.meals}
                                    </TableCell>
                                    <TableCell>
                                      {supplier.moneyEarned} €
                                    </TableCell>
                                    <TableCell>
                                      {supplier.feesPaid} €
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                          <div style={{padding: '10px'}}>
                                <b>Išviso tiekėjų: </b>{SuppliersReports.totalSuppliers}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso užsakymų: </b>{SuppliersReports.totalOrders}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso patiekalų: </b>{SuppliersReports.totalMeals}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso uždirbta pinigų: </b>{SuppliersReports.totalMoney} €
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso sumokėta mokesčių: </b>{SuppliersReports.totalFees} €
                          </div>
                        </>   
                    )   
                }
            </SimplePageContent>
        </div>  
    );
};
