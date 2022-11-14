import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState} from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField } from "@mui/material";
import ClientsReports from "../TempData/ClientReports";
import { motion } from "framer-motion";
import StyledButton from "../Components/StyledButton";

export default function NewCouriers() {
    
    const { userRole } = useContext(UserContext);

    const [ filterSort, setFilterSort] = useState("");
    const [ column, setColumn] = useState("");
    const [ filter, setFilter] = useState("");
    const [ sort, setSort] = useState("");

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Klientų ataskaitos
              </motion.h2>
                {
                    userRole === ROLES.ADMINISTRATOR && (
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
                                      <MenuItem value="orders">Užsakymų skaičius</MenuItem>
                                      <MenuItem value="sum">Užsakymų suma</MenuItem>                                
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
                                  Užsakymų skaičius
                                </TableCell>
                                <TableCell>
                                  Užsakymų suma
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                ClientsReports.reports.map(client => (
                                  <TableRow key={client.clientNumber}>
                                    <TableCell>
                                      {client.clientName}
                                    </TableCell>
                                    <TableCell>
                                      {client.clientSurname}
                                    </TableCell>
                                    <TableCell>
                                      {client.orderCount}
                                    </TableCell>
                                    <TableCell>
                                      {client.orderSum} €
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                          <div style={{padding: '10px'}}>
                                <b>Išviso klientų: </b>{ClientsReports.totalClients}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso užsakymų: </b>{ClientsReports.totalOrders}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Suma: </b>{ClientsReports.totalSum} €
                          </div>
                        </>
                        
                    )
                    
                }
                
            </SimplePageContent>
            
        </div>
        
    );
    
};
