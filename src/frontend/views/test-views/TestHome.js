import React, {Component} from 'react';
import PageHeadingSection from "../../components/sections/PageHeadingSection";
import PageHeadingImage from "../../assets/images/illustrations/Student.svg"
import EvaluationStagesSection from "../../components/sections/evaluation-stages/EvaluationStagesSection";
import PageHeadingButton from "../../components/snippets/PageHeadingButton";
import SectionHeading from "../../components/sections/SectionHeading";
import axios from 'axios';
import { Spinner} from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
 
//   [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];

class TestHome extends Component {
    
    state = {
        loading : false,
        allTests: [],
        user:false
    };
     createData(avg_score, total_score, obtainable_score) {
        return { avg_score, total_score, obtainable_score };
      }
    
      rows () {
          console.log(this.state.allTests)
           this.state.allTests.forEach(el => {
                    return    this.createData(el.avg_score, el.total_score, el.obtainable_score)
    })
        }

    componentDidMount(){
        this.getTests()
    }

    async getTests(){
        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
    
        if (usrProfile == null) return ;
        await this.setState({user: true})
        
        axios.get('https://tiltapp-api.herokuapp.com/tests/'+usrProfile.id).then(async res => {
            // console.log(res.data)
                if(res.status){
                    const tests = []
                    await res.data.forEach(el => {
                        if (el.test_result !== null){
                            
                            const dt = {}
                                dt.date_taken = new Date(el.created_at).toDateString()
                                dt.avg_score = el.test_result.avg_score
                                dt.total_score = el.test_result.total_score
                                dt.obtainable_score = el.test_result.obtainable_score
                            
                            tests.push(dt)
                        }
                    })
                    await this.setState({allTests: tests})
                    
                }
    })
                      
    }

     newTestSession = ()=> {
        this.setState({loading:true})

        const usrProfile = JSON.parse(localStorage.getItem('@UserProfile'))
        const usr = {}
        if (usrProfile !== null){
             usr.user_id = usrProfile.id
        }else usr.user_id = ''

        
          axios.post('https://tiltapp-api.herokuapp.com/test/new-session',usr).then( res => {
            // console.log(res.data)
                if(res.status){
                    
                    this.setState({loading:false})
                    localStorage.setItem('@TstS3ssion', res.data.session_id)

                    this.props.history.push("/test/take-test")
                }  else {
                this.setState({loading:false})
                alert("Could not create session, Please retry")
                }
    
           }).catch( err => {
            this.setState({loading:false})
                console.log(err);
                alert("Error creating session, Please retry")
           });
    }

    showSpinner = (size = "lg", color = "secondary") => (
        <Spinner
            animation="grow"
            size={size}
            aria-hidden="true"
            variant={color}
        />
    );

    TestHistory() {
        // const classes = useStyles();
        // className={classes.table}
        return (
          <TableContainer component={Paper} >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Test Date</TableCell>
                  <TableCell align="right">Average</TableCell>
                  <TableCell align="right">Your Score</TableCell>
                  <TableCell align="center">Obtainable Score</TableCell>
                  {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.allTests.map((row, index) => (
                    
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row.date_taken}
                    </TableCell>
                    <TableCell align="right">{row.avg_score}</TableCell>
                    <TableCell align="right">{row.total_score}</TableCell>
                    <TableCell align="center">{row.obtainable_score}</TableCell>
                    {/* <TableCell align="right">{row.protein}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }


    render() {
        return (
            <main>
                {/* headingImage={PageHeadingImage} */}
                <PageHeadingSection textColor={"primary"} >
                    <h1 className="font-weight-bold text-gray display-1">Welcome To The Test</h1>
                    {/* <h3 className="font-weight-light">Together we will find the cause of each learning deficiency</h3> */}
                    <div  className="d-flex justify-content-center">
                    {this.state.loading ? this.showSpinner("lg") : <PageHeadingButton
                        onClick={this.newTestSession}
                        // link={"/test/take-test"}
                        text={"Begin The Test"}
                        icon={"fa-arrow-right"}
                        color={"secondary"}
                    />}
                    </div>
                    <h3 className="pt-4 mb-0 ">Patiently answer every question honestly</h3>
                    <p className="lead pt-0">Ask your teacher or guardian to explain any question you do not clearly understand</p>
                    <h3 className="pt-4 pb-4 mb-0 text-tertiary">Below are your test history so far</h3>
                    {this.state.user ? this.TestHistory() : <span> You have not taken any test at this moment.</span>}
                    <SectionHeading
                        renderHeading={() => "How the test works!"}
                        renderDescription={() => "The following are the various stages of our assessment"}
                        pb={7}
                        pt={7}
                    />
                </PageHeadingSection>
                <EvaluationStagesSection />
                <div className="d-flex justify-content-center pb-8 pt-lg-4">
                {this.state.loading ? this.showSpinner("lg") :<PageHeadingButton
                        onClick={this.newTestSession}
                        // link={"/test/take-test"}
                        text={"Begin The Test"}
                        icon={"fa-arrow-right"}
                        color={"secondary"}
                    />}
                </div>
            </main>
        );
    }
}

export default TestHome;
