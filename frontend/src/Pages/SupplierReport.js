import Navbar from "../Components/Navbar";
import SimplePageContent from "../Components/SimplePageContent";
import { UserContext } from "../Contexts/UserContext";
import { useContext, useState, useEffect} from "react";
import { ROLES } from "../Enums/Enums";
import { Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField } from "@mui/material";
import { motion } from "framer-motion";
import StyledButton from "../Components/StyledButton";
import { getRestaurantsReport } from "../Services/AdminService";
export default function NewCouriers() {

    
    const { userData } = useContext(UserContext);

    const [ filterSort, setFilterSort] = useState("");
    const [ column, setColumn] = useState("");
    const [ filter, setFilter] = useState("");
    const [ sort, setSort] = useState("");
    const [ listToShow, setShow ] = useState([]);
    const [ suppliers, setSupplier ] = useState([]);

    const fetchSupplierData = async () => {
      const response = await getRestaurantsReport();
      console.log(response);
      if (response) {
        if (response.data.success) {
          
          setSupplier(response.data.restaurants);
          setShow(response.data.restaurants);
        }
      }
    };

    useEffect(() => {
      fetchSupplierData();
      setShow(suppliers);
    }, []);   
    const applyFiltersSort = () => {
      let showList = suppliers;
      if (filterSort == 'filter') {
        if(column == 'name') {
          showList = showList.filter((client) => client.name == filter);
        }
        else if (column == 'orders') {
          showList = showList.filter((client) => client.order_count == filter);
        }
        else if (column == 'meals') {
          showList = showList.filter((client) => client.meal_count == filter);
        }
        else if (column == 'sum') {
          showList = showList.filter((client) => client.price == filter);
        }
        else {
          showList = showList.filter((client) => client.taxes == filter);
        }       
        setShow(showList);
      }
      else {
        if(column == 'name') {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.name.localeCompare(b.name));
          } 
          else {
            showList = showList.sort((a, b) => b.name.localeCompare(a.name));
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
        else if (column == 'meals') {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.meal_count - b.meal_count);
          } 
          else {
            showList = showList.sort((a, b) => b.meal_count - a.meal_count);
          }
        }
        else if (column == 'sum') {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.price - b.price);
          } 
          else {
            showList = showList.sort((a, b) => b.price - a.price);
          }
        }
        else  {
          if(sort == 'asc') {
            showList = showList.sort((a, b) => a.taxes - b.taxes);
          } 
          else {
            showList = showList.sort((a, b) => b.taxes - a.taxes);
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
                Tiekėjų ataskaitos
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
                                { filterSort === "sort" && <StyledButton onClick={() => applyFiltersSort()}
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
                                listToShow.map(supplier => (
                                  <TableRow key={supplier.id}>
                                    <TableCell>
                                      {supplier.name}
                                    </TableCell>
                                    <TableCell>
                                      {supplier.order_count ? supplier.order_count : 0}
                                    </TableCell>
                                    <TableCell>
                                      {supplier.meal_count ? supplier.meal_count : 0}
                                    </TableCell>
                                    <TableCell>
                                      {supplier.price ? supplier.price : 0} €
                                    </TableCell>
                                    <TableCell>
                                      {supplier.taxes ? supplier.taxes : 0} €
                                    </TableCell>
                                  </TableRow>
                                ))
                              }
                            </TableBody>
                          </Table>
                          <div style={{padding: '10px'}}>
                                <b>Išviso tiekėjų: </b>{listToShow.length}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso užsakymų: </b>{listToShow.reduce(function(prev, current) {
                                                          return prev + +current.order_count
                                                          }, 0)}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso patiekalų: </b>{listToShow.reduce(function(prev, current) {
                                                          return prev + +current.meal_count
                                                          }, 0)}
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso uždirbta pinigų: </b>{listToShow.reduce(function(prev, current) {
                                                          return prev + +current.price
                                                          }, 0)} €
                          </div>
                          <div style={{padding: '10px'}}>
                                <b>Išviso sumokėta mokesčių: </b>{listToShow.reduce(function(prev, current) {
                                                          return prev + +current.taxes
                                                          }, 0)} €
                          </div>
                        </>   
                    )   
                }
            </SimplePageContent>
        </div>  
    );
};
