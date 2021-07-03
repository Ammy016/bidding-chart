import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TableFooter,
    TablePagination,
    FormControlLabel,
    Switch 
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    },
    pagination: {
        overflow:'visible'
    },
    footer: {
        display:'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'

    }
  }));



function CustomTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(5);
  const [userData, setUserData] = useState([]);
  const [bidState , setBidState ] = useState(true)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getBids = (bids=[]) => {
      let bid = bids  && bids.length > 0 && bids[0].amount || 0  ;
      for( let i = 1 ; i < bids.length; i++ ){
          if(bidState === true && bids[i].amount > bid) bid = bids[i].amount 
          if(bidState === false && bids[i].amount < bid) bid = bids[i].amount
      }
      return bid ; 
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
      axios.get('https://intense-tor-76305.herokuapp.com/merchants')
      .then(res => {
          setUserData(res.data)

      })
      .catch(err => new Error(err) )
  }, [])

  return (
      <>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Customer name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Email</TableCell>
            <TableCell className={classes.tableHeaderCell}>Phone</TableCell>
            <TableCell className={classes.tableHeaderCell}>Premium</TableCell>
            <TableCell className={classes.tableHeaderCell}>Bid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.firstname} src={row.avatarUrl} className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.firstname} {row.lastname}</Typography>                         
                      </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.email}</Typography>
                </TableCell>
                <TableCell>
                    <Typography color="primary" variant="subtitle2">{row.phone}</Typography>
                </TableCell>
                <TableCell>
                    <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        (row.hasPremium ? 'green' : 'red') 
                    }}
                    >
                        {row.hasPremium ? 'prime' : 'non-prime'}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Typography>{getBids(row.bids)}</Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter className={classes.footer}>
      <TablePagination
            className={classes.pagination}
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={userData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <FormControlLabel
            control={<Switch checked={bidState} onChange={() => setBidState(!bidState)} />}
            label="Show Max Bid"
        />
      </TableFooter>
    </TableContainer>
  </>
  );
}

export default CustomTable;