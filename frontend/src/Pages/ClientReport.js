import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState, useEffect} from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField } from "@mui/material";
import ClientsReports from "../TempData/ClientReports";
import { motion } from "framer-motion";
import StyledButton from "../Components/StyledButton";
import { getClientsReport } from "../Services/AdminService";

export default function NewCouriers() {
    
    const { userData } = useContext(UserContext);

    const [ filterSort, setFilterSort] = useState("");
    const [ column, setColumn] = useState("");
    const [ filter, setFilter] = useState("");
    const [ sort, setSort] = useState("");
    const [ listToShow, setShow ] = useState([]);
    const [ clients, setClients ] = useState([]);

    const fetchClientsData = async () => {
      const response = await getClientsReport();
      
      if (response) {
        if (response.data.success) {
          setClients(response.data.clients);
          setShow(response.data.clients);
        }
      }
    };

    useEffect(() => {
      fetchClientsData();
      setShow(clients);
    }, []);

    const applyFiltersSort = () => {
      console.log("Aaaaaa");
      let showList = clients;
      if (filterSort == 'filter') {
        if(column == 'name') {
          showList = showList.filter((client) => client.firstname == filter);
        }
        else if (column == 'surname') {
          showList = showList.filter((client) => client.lastname == filter);
        }
        else if (column == 'orders') {
          showList = showList.filter((client) => client.order_count == filter);
        }
        else {
          showList = showList.filter((client) => client.order_sum == filter);
        }       
        setShow(showList);
      }
      else {
        if(column == 'name') {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.firstname.localeCompare(b.firstname));
          } 
          else {
            showList = showList.sort((a, b) => b.firstname.localeCompare(a.firstname));
          }          
        }
        
        else if (column == 'surname') {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.lastname.localeCompare(b.lastname));
          } 
          else {
            showList = showList.sort((a, b) => b.lastname.localeCompare(a.lastname));
          }
          
        }
        else if (column == 'orders') {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.order_count - b.order_count);
          } 
          else {
            showList = showList.sort((a, b) => b.order_count - a.order_count);
          }
        }
        else  {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.order_sum - b.order_sum);
          } 
          else {
            showList = showList.sort((a, b) => b.order_sum - a.order_sum);
          }
        }       
        setShow(showList);
      }
    }

    return (
        <div>
            <Navbar/>
            <SimplePageContent>
              <motion.h2 className="header">
                Klientų ataskaitos
              </motion.h2>
                {
                    userData.role === ROLES.ADMINISTRATOR && listToShow && (
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
                                { filterSort === "filter" && <StyledButton onClick={() => applyFiltersSort()}
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
                                { filterSort === "sort" && <StyledButton onClick={() =>applyFiltersSort()}
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
                                listToShow.map(client => (
                                  <TableRow key={client.id}>
                                    <TableCell>
                                      {client.firstname }
                                    </TableCell>
                                    <TableCell>
                                      {client.lastname}
                                    </TableCell>
                                    <TableCell>
                                      {client.order_count ? client.order_count : 0}
                                    </TableCell>
                                    <TableCell>
                                      {client.order_sum ? client.order_sum : 0} €
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                          <div style={{padding: '10px'}}>
                                <b>Išviso klientų: </b>{listToShow.length}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso užsakymų: </b>{listToShow.reduce(function(prev, current) {
                                                          return prev + +current.order_count
                                                          }, 0)}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Suma: </b>{listToShow.reduce(function(prev, current) {
                                                          return prev + +current.order_sum
                                                          }, 0)} €
                          </div>
                        </>
                        
                    )
                    
                }
                
            </SimplePageContent>
            
        </div>
        
    );
    
};
