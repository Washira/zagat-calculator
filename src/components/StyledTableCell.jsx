import { withStyles } from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    borderBottom: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    // color: '#FFFFFF',
  },
}))(TableCell);

export default StyledTableCell;