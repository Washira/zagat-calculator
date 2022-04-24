import { withStyles } from '@material-ui/core/styles';
import { TableRow } from '@material-ui/core';

const StyledTableRowRed = withStyles((theme) => ({
  root: {
    backgroundColor: '#F1C40F',
  },
}))(TableRow);

export default StyledTableRowRed;