import { makeStyles } from '@mui/styles';

const drawerWitdth = 240;

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    // display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      flexWrap: 'wrap',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWitdth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWitdth,
  },
  linkButton: {
    '&:hover': {
      color: 'white !important',
      textDecoration: 'none',
    },
  },
}));
