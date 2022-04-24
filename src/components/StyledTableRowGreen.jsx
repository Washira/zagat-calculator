import { withStyles } from '@material-ui/core/styles';
import { TableRow } from '@material-ui/core';

const StyledTableRowGreen = withStyles((theme) => ({
  root: {
    backgroundColor: '#1E8449',
  },
}))(TableRow);

export default StyledTableRowGreen;