import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState} from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField} from "@mui/material";
import CouriersReports from "../TempData/CourierReports";
import StyledButton from "../Components/StyledButton";
import { motion } from "framer-motion";

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
                Kurjerių ataskaitos
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
                                      <MenuItem value="name">Vardas</MenuItem>
                                      <MenuItem value="surname">Pavardė</MenuItem>       
                                      <MenuItem value="delivered">Pristatyti užsakymai</MenuItem>
                                      <MenuItem value="canceled">Atšaukti užsakymai</MenuItem>     
                                      <MenuItem value="money">Uždirbti pinigai</MenuItem>                               
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
                                  Vardas
                                </TableCell>
                                <TableCell>
                                  Pavardė
                                </TableCell>
                                <TableCell>
                                  Pristatytų užsakymų skaičius
                                </TableCell>
                                <TableCell>
                                  Atšauktų užsakymų skaičius
                                </TableCell>
                                <TableCell>
                                  Uždirbta pinigų
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                CouriersReports.reports.map(courier => (
                                  <TableRow key={courier.clientNumber}>
                                    <TableCell>
                                      {courier.courierName}
                                    </TableCell>
                                    <TableCell>
                                      {courier.courierSurname}
                                    </TableCell>
                                    <TableCell>
                                      {courier.deliveredOrders}
                                    </TableCell>
                                    <TableCell>
                                      {courier.canceledOrders}
                                    </TableCell>
                                    <TableCell>
                                      {courier.moneyEarned} €
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                          <div style={{padding: '10px'}}>
                                <b>Išviso kurjerių: </b>{CouriersReports.totalCouriers}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso atšauktų užsakymų: </b>{CouriersReports.totalCanceled}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso pristatytų užsakymų: </b>{CouriersReports.totalDelivered}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Uždirbta pinigų: </b>{CouriersReports.totalMoney} €
                          </div>
                        </>
                        
                    )
                    
                }
                
            </SimplePageContent>
            
        </div>
        
    );
    
};
