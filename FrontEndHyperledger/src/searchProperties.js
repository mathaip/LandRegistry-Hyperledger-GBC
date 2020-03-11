import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Button } from '@material-ui/core';

// Generate Order Data


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function AllHouses(){
    const classes = useStyles();
    const [ apiResponse, setAPIResponse] = React.useState([])
    
    const handleSubmit= ()=>{
     fetch('http://localhost:9000/queryAllHouses', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }

    })
     .then(
     function(response){
       return response.json();
   })
    .then(function(jsonStr){
        console.log(jsonStr);
        setAPIResponse(jsonStr)
    });
      }
      
     
     
     
     
     return(
      <React.Fragment>
      <Title> 
        <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        >
        Search All Properties
        </Button>
      </Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>docType</TableCell>
            <TableCell>owner</TableCell>
            <TableCell>type</TableCell>
            <TableCell align="right">Phone Number</TableCell>
          </TableRow>
        </TableHead>
      <TableBody>
           {apiResponse.map(house=>(
            <TableRow key={house.Key}>
              <TableCell>{house.Record.address}</TableCell>
              <TableCell >{house.Record.docType}</TableCell>
              <TableCell >{house.Record.owner}</TableCell>
              <TableCell >{house.Record.type}</TableCell>
              <TableCell >{house.Record.unicID}</TableCell>

              </TableRow>
           ))}
           </TableBody>
           </Table>
    </React.Fragment>
     )
   }

