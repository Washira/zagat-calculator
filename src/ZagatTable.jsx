import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Typography
} from '@material-ui/core';
import StyledTableCell from './components/StyledTableCell';
import StyledTableRowGreen from './components/StyledTableRowGreen';
import StyledTableRowRed from './components/StyledTableRowRed';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    
  },
  textField: {
    width: '20vw',
  },
  middle: {
    margin: "1.5%",
    width: "100%",
    maxWidth: "50%"
  },
  title: {
    textAlign: 'center',
  },
  button: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      marginTop: "3%",
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: "10%",
    },
  },
  label: {
    width: "100%",
    maxWidth: "100%",
    [theme.breakpoints.up('md')]: {
      textAlign: "right",
      marginTop: "3%",
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: "left",
      marginTop: "5%",
    },
  },
  textFieldGrid: {
    [theme.breakpoints.up('md')]: {
      width: '50%',
      textAlign: 'left',
      marginLeft: '10%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  parallel: {
    width: "100%",
    maxWidth: "30%",
  },
  box: {
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
    marginBottom: "3%"
  },
  baht: {
    margin: "1.5%",
    width: "100%",
    maxWidth: "10%",
  },
  remark: {
    margin: "1.5%",
    width: "100%",
    maxWidth: "90%"
  },
  space: {
    marginTop: '3%'
  },
}));

const nowDate = new Date().getDate();
const nowYear = parseInt(new Date().getFullYear()) + 543;
const nowMonth = () => {
  switch (new Date().getMonth()) {
    case 0:
      return 'มกราคม';
    case 1:
      return 'กุมภาพันธ์';
    case 2:
      return 'มีนาคม';
    case 3:
      return 'เมษายน';
    case 4:
      return 'พฤษภาคม';
    case 5:
      return 'มิถุนายน';
    case 6:
      return 'กรกฎาคม';
    case 7:
    return 'สิงหาคม';
    case 8:
      return 'กันยายน';
    case 9:
      return 'ตุลาคม';
    case 10:
      return 'พฤศจิกายน';
    case 11:
      return 'ธันวาคม';
    default:
      return;
  };
};

const numberWithCommas = (number) => {
  let formatedNumber = new Intl.NumberFormat().format(number);
  return formatedNumber;
};

const FieldContents = ({label, state, setState, disableState}) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row">
      <Grid container spacing={1}>
        <Grid item xs={12} md={5}>
          <Typography
            className={classes.label}
          >
            {label}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <TextField
            id="outlined-margin-dense"
            className={classes.textFieldGrid}
            disabled={disableState}
            margin="dense"
            variant="outlined"
            type="number"
            placeholder="บาท"
            value={state}
            onChange={setState}
          />
        </Grid>
      </Grid>
    </Box>
  )
};

export default function ZagatTable(props) {
  const classes = useStyles();
  const [submit, setSubmit] = React.useState(false);
  const [cash, setCash] = React.useState('');
  const [inBank, setInBank] = React.useState('');
  const [interest, setInterest] = React.useState('')
  const [loan, setLoan] = React.useState('');
  const [stock, setStock] = React.useState('');
  const [other, setOther] = React.useState('')
  const [gold, setGold] = React.useState('');
  const [jewelry, setJewelry] = React.useState('');
  const [total, setTotal] = React.useState({ number: 0, withCommas: parseFloat(0) });
  const [totalExpense, setTotalExpense] = React.useState({ number: 0, withCommas: parseFloat(0) });
  const [goldPrice, setGoldPrice] = React.useState({ number: '', withCommas: '' });
  const [jewelryPrice, setJewelryPrice] = React.useState({ number: '', withCommas: '' });
  const [zagatRate, setZagatRate] = React.useState('');

  // Values for display
  const cashValue = cash;
  const inBankValue = inBank;
  const interestValue = interest;
  const loanValue = loan;
  const stockValue = stock;
  const otherValue = other;
  const goldValue = gold;
  const jewelryValue = jewelry;
  // const totalValue = total.withCommas ? total.withCommas : '';
  // const totalExpenseryValue = totalExpense.withCommas ? totalExpense.withCommas : '';
  // const goldPriceValue = goldPrice.withCommas;
  // const jewelryPriceValue = jewelryPrice.withCommas;
  // const zagatRateValue = zagatRate;

  const cashHandleChange = e => setCash(e.target.value);
  const inBankHandleChange = e => setInBank(e.target.value);
  const interestHandleChange = e => setInterest(e.target.value);
  const loanHandleChange = e => setLoan(e.target.value);
  const stockHandleChange = e => setStock(e.target.value);
  const otherHandleChange = e => setOther(e.target.value);
  const goldHandleChange = e => setGold(e.target.value);
  const jewelryHandleChange = e => setJewelry(e.target.value);

  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    return fetch("https://scrap-goldtraders-rest-api.vercel.app/", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        let goldPrice = parseInt(result.goldSell.replace(/,/g, ''), 10);
        let jewelryPrice = parseInt(result.jewelrySell.replace(/,/g, ''), 10);
        let goldPriceWithCommas = numberWithCommas(goldPrice);
        let jewelryPriceWithCommas = numberWithCommas(jewelryPrice);
        setGoldPrice({ number: goldPrice, withCommas: goldPriceWithCommas });
        setJewelryPrice({ number: jewelryPrice, withCommas: jewelryPriceWithCommas });
        let zagatRate = Math.round(5.576 * jewelryPrice);
        let zagatRateWithCommas = numberWithCommas(zagatRate);
        setZagatRate({ number: zagatRate, withCommas: zagatRateWithCommas });
      })
      .catch(error => console.log('error', error));
  };

  const onSubmit = () => {
    setSubmit(true);
    let numCash = cash ? parseFloat(cash) : parseFloat(0);
    let numInBank = inBank ? parseFloat(inBank) : parseFloat(0);
    let numInterest = interest ? parseFloat(interest) : parseFloat(0);
    let numLoan = loan ? parseFloat(loan) : parseFloat(0);
    let numStock = stock ? parseFloat(stock) : parseFloat(0);
    let numOther = other ? parseFloat(other) : parseFloat(0);
    let numGold = gold ? parseFloat(gold) : parseFloat(0);
    let valGold = numGold * parseFloat(goldPrice.number);
    let numJewelry = jewelry ? parseFloat(jewelry) : parseFloat(0);
    let valJewelry = numJewelry * parseFloat(jewelryPrice.number);
    let calTotal = numCash + numInBank + numInterest + numLoan + numStock + numOther + valGold + valJewelry;
    let calTotalWithCommas = numberWithCommas(parseFloat(calTotal));
    setTotal({ number: calTotal, withCommas: calTotalWithCommas });
    let totalCash = numCash + numInBank + numInterest + numLoan + numStock + numOther;
    let totalGold = valGold + valJewelry;
    if (totalCash + totalGold >= zagatRate.number) {
      let expense = Math.round((totalCash + totalGold) * 0.025);
      let expenseWithCommas = numberWithCommas(expense);
      setTotalExpense({ number: expense, withCommas: expenseWithCommas });
    } else {
      return;
    };
  }

  React.useEffect(() => {
    fetchData();
  }, [total, totalExpense]);

  return (
    <div className={classes.root}>
      <React.Fragment>
        <Container>
          <Grid>
            <Card>
              <CardMedia
                component="img"
                alt="บริการคำนวณซากาตออนไลน์"
                height="100%"
                image={`${process.env.PUBLIC_URL}/cover.jpg`}
                title="บริการคำนวณซากาตออนไลน์"
              />
              <CardHeader title="บริการคำนวณซากาตออนไลน์" className={classes.title}></CardHeader>
              <Divider />
              <CardContent>
                <div className={classes.box}>

                  <FieldContents
                    label={'เงินสด'}
                    state={cashValue}
                    setState={cashHandleChange}
                    disableState={false}
                  />

                  <FieldContents
                    label={'เงินในบัญชีธนาคาร/สหกรณ์ฯ'}
                    state={inBankValue}
                    setState={inBankHandleChange}
                    disableState={false}
                  />

                  <FieldContents
                    label={'ดอกเบี้ยจากธนาคาร/สหกรณ์'}
                    state={interestValue}
                    setState={interestHandleChange}
                    disableState={false}
                  />

                  <FieldContents
                    label={'เงินให้ผู้อื่นยืนและคาดว่าจะได้รับคืน'}
                    state={loanValue}
                    setState={loanHandleChange}
                    disableState={false}
                  />

                  <FieldContents
                    label={'เงินลงทุนในตลาดหลักทรัพย์'}
                    state={stockValue}
                    setState={stockHandleChange}
                    disableState={false}
                  />

                  <FieldContents
                    label={'เงินมูฎอรอบะฮฺหรือเงินลงทุนอื่นๆ'}
                    state={otherValue}
                    setState={otherHandleChange}
                    disableState={false}
                  />

                  <FieldContents
                    label={'ทองคำแท่ง (น้ำหนักทอง)'}
                    state={goldValue}
                    setState={goldHandleChange}
                    disableState={false}
                  />

                  <FieldContents
                    label={'ทองคำรูปพรรณ (น้ำหนักทอง)'}
                    state={jewelryValue}
                    setState={jewelryHandleChange}
                    disableState={false}
                  />

                  {/* <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Divider className={classes.label} />
                      </Grid>
                    </Grid>
                  </Box> */}

                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={12} className={classes.button} >
                        <Button
                          variant="contained"
                          style={{ backgroundColor: '#2CB300', color: '#FFFFFF'}}
                          onClick={onSubmit}
                        >
                          คำนวณซากาต
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>

                  {submit && (
                    <Box>
                      <Grid container spacing={1}>
                        <Grid item xs={0} md={2}></Grid>
                        <Grid item xs={12} md={8} className={classes.button} >
                          <Card>
                            <CardContent>
                              <Typography variant='h6'>{`วันที่ ${nowDate} ${nowMonth()} ${nowYear}`}</Typography>
                              <Typography className={classes.space}></Typography>
                              <Typography variant='h6'>{`ราคาทองคำ`}</Typography>
                              <Typography variant='h5'>{`${goldPrice.withCommas} บาท`}</Typography>
                              <Typography className={classes.space}></Typography>
                              <Typography variant='h6'>{`ราคาทองคำรูปพรรณ`}</Typography>
                              <Typography variant='h5'>{`${jewelryPrice.withCommas} บาท`}</Typography>
                              <Typography className={classes.space}></Typography>
                              <Typography variant='h6'>{`พิกัดที่ต้องจ่ายซากาต`}</Typography>
                              <Typography variant='h5'>{`${zagatRate.withCommas} บาท`}</Typography>
                              <Typography className={classes.space}></Typography>
                            </CardContent>
                            <TableContainer>
                              <Table>
                                <TableBody>
                                  <StyledTableRowGreen align="right">
                                    <StyledTableCell component="th" scope="row">
                                      <Typography style={{ color: '#FFFFFF'}}>สินทรัพย์รวม</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="right">
                                    <Typography style={{ color: '#FFFFFF'}}>{`${total.withCommas} บาท`}</Typography>
                                    </StyledTableCell>
                                  </StyledTableRowGreen>
                                </TableBody>
                              </Table>
                            </TableContainer>
                            <TableContainer>
                              <Table>
                                <TableBody>
                                  <StyledTableRowRed align="right">
                                    <StyledTableCell component="th" scope="row">
                                    <Typography style={{ color: '#FFFFFF'}}>กำหนดที่ต้องจ่ายซากาต</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="right">
                                    <Typography style={{ color: '#FFFFFF'}}>{`${totalExpense.withCommas} บาท`}</Typography>
                                    </StyledTableCell>
                                  </StyledTableRowRed>
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Card>
                        </Grid>
                        <Grid item xs={0} md={2}></Grid>
                        <Grid item xs={12} className={classes.button}>
                          <TableContainer>
                            <Table>
                              <TableBody></TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </div>

                <Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                </Box>

                <Grid container spacing={3} style={{ marginTop: '1.5%' }}>
                  <Grid item xs={2} md={4}><Box></Box></Grid>
                  <Grid item xs={8} md={4}>
                    <Card>
                      <CardMedia
                        component="img"
                        alt="ร่วมบริจาคซากาต"
                        height="50%"
                        image={`${process.env.PUBLIC_URL}/1.jpg`}
                        title="ร่วมบริจาคซากาต"
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={2} md={4}><Box></Box></Grid>
                </Grid>
                <Grid container spacing={3} style={{ marginTop: '1.5%' }}>
                  <Grid item xs={2} md={4}><Box></Box></Grid>
                  <Grid item xs={8} md={4}>
                    <Typography align='center' variant='h6'>{`ข้อมูลบัญชีธนาคาร`}</Typography>
                    <Typography align='center'>{`ธนาคารกรุงไทย`}</Typography>
                    <Typography align='center' variant='h5'>{`763-0-71932-9`}</Typography>
                    <Typography align='center'>{`ชมรมมัดรอซะห์ตะห์ฟิช อัล-อินชานียะห์`}</Typography>
                    <Typography align='center'>{`ทางเราอยู่ในผู้มีสิทธิ์รับซะกาต "ในทางของอัลลอฮ" สร้างมัสยิดและโรงเรียนตะฟิซ`}</Typography>
                  </Grid>
                  <Grid item xs={2} md={4}><Box></Box></Grid>
                </Grid>

                <Grid container spacing={3} style={{marginTop: '1.5%'}}>
                  <Grid item xs={12} md={6}>
                    <Grid container>
                      <Grid item xs={2} md={0}></Grid>
                      <Grid item xs={8} md={12}>
                        <Box>
                          <a href="https://m.me/TahfizAlinsaniyah">
                            <CardMedia
                              component="img"
                              alt="สอบถามเพิ่มเติม"
                              image={`${process.env.PUBLIC_URL}/3.gif`}
                              title="สอบถามเพิ่มเติม"
                            />
                          </a>
                        </Box>
                      </Grid>
                      <Grid item xs={2} md={0}></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Grid container>
                      <Grid item xs={2} md={0}></Grid>
                      <Grid item xs={8} md={12}>
                        <Box>
                          <a href="tel:0847508980">
                            <CardMedia
                              component="img"
                              alt="สอบถามเพิ่มเติม"
                              image={`${process.env.PUBLIC_URL}/4.gif`}
                              title="สอบถามเพิ่มเติม"
                            />
                          </a>
                        </Box>
                      </Grid>
                      <Grid item xs={2} md={0}></Grid>
                    </Grid>
                  </Grid>
                </Grid>

              </CardContent>
            </Card>

            <div className={classes.box}></div>

            <div className={classes.box}>
            <Box display="flex" flexDirection="row">
              <Typography align='center' className={classes.remark}>
                หมายเหตุ : ทองที่นำมาคำนวณซากาตนั้นหมายถึงทองที่เป็นทรัพย์สินสำหรับขาย ไม่ใช่ทองที่ไว้สำหรับสวนใส่ในยามปกติ
              </Typography>
            </Box>
            </div>
            
          </Grid>
        </Container>
      </React.Fragment>
    </div>
  );
}