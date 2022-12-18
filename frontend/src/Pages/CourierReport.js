import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState, useEffect} from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField} from "@mui/material";
import StyledButton from "../Components/StyledButton";
import { motion } from "framer-motion";
import { getCouriersReport } from "../Services/AdminService";

export default function NewCouriers() {
    
    const { userData } = useContext(UserContext);

    const [ filterSort, setFilterSort] = useState("");
    const [ column, setColumn] = useState("");
    const [ filter, setFilter] = useState("");
    const [ sort, setSort] = useState("");
    const [ listToShow, setShow ] = useState([]);
    const [ couriers, setCouriers ] = useState([]);

    const fetchCouriersData = async () => {
      const response = await getCouriersReport();
      
      if (response) {
        if (response.data.success) {
          setCouriers(response.data.couriers);
          setShow(response.data.couriers);
        }
      }
    };

    useEffect(() => {
      fetchCouriersData();
      setShow(couriers);
    }, []);

    const applyFiltersSort = () => {
      console.log("Aaaaaa");
      let showList = couriers;
      if (filterSort == 'filter') {
        if(column == 'name') {
          showList = showList.filter((client) => client.firstname == filter);
        }
        else if (column == 'surname') {
          showList = showList.filter((client) => client.lastname == filter);
        }
        else if (column == 'delivered') {
          showList = showList.filter((client) => client.completed == filter);
        }
        else if (column == 'canceled') {
          showList = showList.filter((client) => client.declined == filter);
        }
        else {
          showList = showList.filter((client) => client.money == filter);
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
        else if (column == 'delivered') {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.completed - b.completed);
          } 
          else {
            showList = showList.sort((a, b) => b.completed - a.completed);
          }
        }
        else if (column == 'canceled') {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.declined - b.declined);
          } 
          else {
            showList = showList.sort((a, b) => b.declined - a.declined);
          }
        }
        else  {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.money - b.money);
          } 
          else {
            showList = showList.sort((a, b) => b.money - a.money);
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
                Kurjerių ataskaitos
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
                                { filterSort === "filter" && <StyledButton onClick={() =>applyFiltersSort()}
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
                                listToShow.map(courier => (
                                  <TableRow key={courier.id}>
                                    <TableCell>
                                      {courier.firstname}
                                    </TableCell>
                                    <TableCell>
                                      {courier.lastname}
                                    </TableCell>
                                    <TableCell>
                                      {courier.completed}
                                    </TableCell>
                                    <TableCell>
                                      {courier.declined}
                                    </TableCell>
                                    <TableCell>
                                      {courier.money} €
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                          <div style={{padding: '10px'}}>
                                <b>Išviso kurjerių: </b>{listToShow.length}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso atšauktų užsakymų: </b>{listToShow.reduce(function(prev, current) {
                                                          return prev + +current.declined
                                                          }, 0)}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso pristatytų užsakymų: </b>{listToShow.reduce(function(prev, current) {
                                                          return prev + +current.completed
                                                          }, 0)}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Uždirbta pinigų: </b>{listToShow.reduce(function(prev, current) {
                                                          return prev + +current.money
                                                          }, 0)} €
                          </div>
                        </>
                        
                    )
                    
                }
                
            </SimplePageContent>
            
        </div>
        
    );
    
};
