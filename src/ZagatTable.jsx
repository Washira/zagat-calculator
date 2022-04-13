import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, CardHeader, Container, Grid, TextField, Typography } from '@material-ui/core';

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
  parallel: {
    width: "100%",
    maxWidth: "30%",
    // '& > *': {
    //   margin: theme.spacing(1),
    // },
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
}));

export default function LayoutTextFields() {
  const classes = useStyles();
  const [cash, setCash] = React.useState('');
  const [inBank, setInBank] = React.useState('');
  const [loan, setLoan] = React.useState('');
  const [stock, setStock] = React.useState('');
  const [gold, setGold] = React.useState('');
  const [jewelry, setJewelry] = React.useState('');
  const [total, setTotal] = React.useState(0);
  const [totalExpense, setTotalExpense] = React.useState(0)
  const [goldPrice, setGoldPrice] = React.useState(0);
  const [jewelryPrice, setJewelryPrice] = React.useState(0);
  const [zagatRate, setZagatRate] = React.useState(0);

  const fetchData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    return fetch("https://scrap-goldtraders-rest-api.vercel.app/", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        let goldPrice = parseInt(result.goldSell.replace(/,/g, ''), 10);
        let jewelryPrice = parseInt(result.jewelrySell.replace(/,/g, ''), 10);
        setGoldPrice(goldPrice);
        setJewelryPrice(jewelryPrice);
        setZagatRate(parseInt(5.6 * jewelryPrice));
      })
      .catch(error => console.log('error', error));
  }

  React.useEffect(() => {
    fetchData();
    let numCash = cash ? parseFloat(cash) : parseFloat(0);
    let numInBank = inBank ? parseFloat(inBank) : parseFloat(0);
    let numLoan = loan ? parseFloat(loan) : parseFloat(0);
    let numStock = stock ? parseFloat(stock) : parseFloat(0);
    let numGold = gold ? parseFloat(gold) : parseFloat(0);
    let valGold = numGold * parseFloat(goldPrice);
    let numJewelry = jewelry ? parseFloat(jewelry) : parseFloat(0);
    let valJewelry = numJewelry * parseFloat(jewelryPrice);
    let calTotal = numCash + numInBank + numLoan + numStock + valGold + valJewelry;
    setTotal(calTotal);
    let totalCash = numCash + numInBank + numLoan + numStock;
    let totalGold = valGold + valJewelry;
    let expense;
    if (totalCash + totalGold >= zagatRate) {
      expense = (totalCash + totalGold) * 0.025;
      setTotalExpense(expense);
    } else {
      setTotalExpense(0);
    };
  }, [cash, inBank, loan, stock, gold, jewelry, goldPrice, jewelryPrice, zagatRate]);

  return (
    <div className={classes.root}>
      <React.Fragment>
        <Container>
          <Grid>
            <Card>
              <CardHeader title="บริการคำนวนซะกาตออนไลน์"></CardHeader>
              <CardContent>
                <div className={classes.box}>
                  <Box display="flex" flexDirection="row">
                    <Typography align='left' className={classes.middle}>เงินสด</Typography>
                    <div className={classes.parallel}>
                      <TextField
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        type="number"
                        value={cash}
                        onChange={e => setCash(e.target.value)}
                      />
                    </div>
                    <Typography align='left' className={classes.baht}>บาท</Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Typography align='left' className={classes.middle}>เงินในบัญชีธนาคาร,สหกรณ์ฯ</Typography>
                    <div className={classes.parallel}>
                      <TextField
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        type="number"
                        value={inBank}
                        onChange={e => setInBank(e.target.value)}
                      />
                    </div>
                    <Typography align='left' className={classes.baht}>บาท</Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Typography align='left' className={classes.middle}>เงินให้ผู้อื่นยืนและคาดว่าจะได้รับคืน</Typography>
                    <div className={classes.parallel}>
                      <TextField
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        type="number"
                        value={loan}
                        onChange={e => setLoan(e.target.value)}
                      />
                    </div>
                    <Typography align='left' className={classes.baht}>บาท</Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Typography align='left' className={classes.middle}>เงินลงทุนในตลาดหลักทรัพย์</Typography>
                    <div className={classes.parallel}>
                      <TextField
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        type="number"
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                      />
                    </div>
                    <Typography align='left' className={classes.baht}>บาท</Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Typography align='left' className={classes.middle}>ทองคำแท่ง (น้ำหนักทอง)</Typography>
                    <div className={classes.parallel}>
                      <TextField
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        type="number"
                        value={gold}
                        onChange={e => setGold(e.target.value)}
                      />
                    </div>
                    <Typography align='left' className={classes.baht}>บาท</Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Typography align='left' className={classes.middle}>ทองคำรูปพรรณ (น้ำหนักทอง)</Typography>
                    <div className={classes.parallel}>
                      <TextField
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        type="number"
                        value={jewelry}
                        onChange={e => setJewelry(e.target.value)}
                      />
                    </div>
                    <Typography align='left' className={classes.baht}>บาท</Typography>
                  </Box>

                  <Box display="flex" flexDirection="row">
                    <Typography align='left' className={classes.middle}>สินทรัพย์รวม</Typography>
                    <div className={classes.parallel}>
                      <TextField
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        disabled
                        value={total? total : 0}
                        onChange={e => setTotal(e.target.value)}
                      />
                    </div>
                    <Typography align='left' className={classes.baht}>บาท</Typography>
                  </Box>
                </div>
              </CardContent>
            </Card>

            <div className={classes.box}>
              <Box display="flex" flexDirection="row">
                <Typography align='left' className={classes.middle}>จำนวนเงินที่คุณต้องจ่ายซะกาต</Typography>
                <div className={classes.parallel}>
                  <TextField
                    id="outlined-margin-dense"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    disabled
                    value={totalExpense? totalExpense : 0}
                    onChange={e => setTotalExpense(e.target.value)}
                  />
                </div>
                <Typography align='left' className={classes.baht}>บาท</Typography>
              </Box>
            </div>
            
            <div className={classes.box}>
              <Box display="flex" flexDirection="row">
                <Typography align='left' className={classes.middle}>ราคาทองคำแท่งวันนี้</Typography>
                <div className={classes.parallel}>
                  <TextField
                    disabled
                    id="outlined-margin-dense"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    // defaultValue={goldPrice}
                    value={goldPrice}
                  />
                </div>
                <Typography align='left' className={classes.baht}>บาท</Typography>
              </Box>

              <Box display="flex" flexDirection="row">
                <Typography align='left' className={classes.middle}>ราคาทองคำรูปพรรณวันนี้</Typography>
                <div className={classes.parallel}>
                  <TextField
                    disabled
                    id="outlined-margin-dense"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    // defaultValue={jewelryPrice}
                    value={jewelryPrice}
                  />
                </div>
                <Typography align='left' className={classes.baht}>บาท</Typography>
              </Box>

              <Box display="flex" flexDirection="row">
                <Typography align='left' className={classes.middle}>พิกัดที่ต้องจ่ายซะกาต (คิดจากทองรูปพรรณ)</Typography>
                <div className={classes.parallel}>
                  <TextField
                    disabled
                    id="outlined-margin-dense"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    value={zagatRate}
                  />
                </div>
                <Typography align='left' className={classes.baht}>บาท</Typography>
              </Box>
            </div>

            <div className={classes.box}>
            <Box display="flex" flexDirection="row">
              <Typography align='left' className={classes.remark}>
                หมายเหตุ : ทองที่นำมาคำนวณซะกาตนั้นหมายถึงทองที่เป็นทรัพย์สินสำหรับขาย ไม่ใช่ทองที่ไว้สำหรับสวนใส่ในยามปกติ
              </Typography>
            </Box>
            </div>
            
          </Grid>
        </Container>
      </React.Fragment>
    </div>
  );
}