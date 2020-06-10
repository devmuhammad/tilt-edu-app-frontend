import React, {Component} from 'react';
import AuthContainer from "../AuthContainer";
import OauthSocialButtons from "../login/OauthSocialButtons";
import { userInfo } from 'os';
import Loader from 'react-loader-spinner'
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router'; 

// const history = useHistory();
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
//   schoolInfo:{
//     "school_name":"Gateway Academy",
//     "school_address": "Area 2, garki",
//     "school_description":"N/A",
//     "first_name":"Femi",
//     "last_name":"Admin",
//     "middle_name":"",
//     "email":"gateway@gmail.com",
//     "phone_number":"09736575335",
//     "password":"femi",
//     "school_city":"Abuja",
//     "school_zipcode":"900233",
//     "school_state":"",
//     "school_country":""
// },

class Register extends Component {

    // constructor (props) {
    //     super(props);
    state = {
        active: "personal",
        loading:false,
        sloading:false,
        allowState:true,
        countries:[],
        selectedCountry:null,
        allstates:[],
        schoolInfo:{
            "school_name":"",
            "school_address": "",
            "school_description":"N/A",
            "first_name":"",
            "last_name":"",
            "middle_name":"",
            "email":"",
            "phone_number":"",
            "password":"",
            "school_city":"",
            "school_zipcode":"",
            "school_state":"",
            "school_country":""
        },
        learnerInfo:{
            "first_name":"",
            "last_name":"",
            "middle_name":"",
            "email":"",
            "phone_number":"",
            "password":""
        },
        termsAgree:false,
        termsAgreed:false,
        confPass: "",
        confirmPass: "",
        open:false
    };

// }
    componentDidMount() {

        this.setDetails()
    }

    setDetails(){
        axios.get('https://tiltapp-api.herokuapp.com/countries').then(async res => {
                if (res.status){
                     
                this.setState({countries: res.data})

                    }
            }).catch( err => {
                this.setState({loading: false})
                // alert("error, Try Again")
                console.log(err);
            });
    }

    selectState = (event) =>{
       
        const tgt = JSON.parse(event.target.value)
        const id = tgt.id
        
        this.setState({schoolInfo: {...this.state.schoolInfo,school_country: event.target.value.name}})
        axios.get('https://tiltapp-api.herokuapp.com/countries/'+id+'/states').then(async res => {
                if (res.status){
                
                this.setState({allowState: false})
                     
                this.setState({allstates: res.data})

                    }
            }).catch( err => {
                this.setState({loading: false})
                // alert("Network Error, Try Again")

                console.log(err);
            });
    }


    signUpLearner = (e) =>{
        e.preventDefault()
        if (
            this.state.learnerInfo.first_name === "" ||
            this.state.learnerInfo.last_name === "" ||
            this.state.learnerInfo.email === "" ||
            this.state.learnerInfo.phone_number === "" ||
            this.state.learnerInfo.password === "" ||
            this.state.confPass === "" ||
            this.state.termsAgree == false 
        ){
           return alert("Please complete required details and agree the terms")
             
        }
        if (this.state.learnerInfo.password !== this.state.confPass){
            return alert("Passwords do not match")
            // return;
        }
            const data = this.state.learnerInfo
            this.setState({loading: true})
            
            axios.post('https://tiltapp-api.herokuapp.com/registration/learner',data).then(async res => {
                if (res.status){
                    await this.handleClick()
                     this.clearLnData()
                  
                     this.setState({loading: false})
                    this.props.history.push('/auth/login',{...data})

                    }else {
                        this.setState({loading: false})
                       return alert("Could not register Learner, Please try Again")
                
                    }
                
            }).catch( err => {
                this.setState({loading: false})
                // alert("Network error, Try Again")

                console.log(err);
            });

    }
    signUpSchool = (e) =>{
        e.preventDefault()
        if (
            this.state.schoolInfo.first_name === "" ||
            this.state.schoolInfo.last_name === "" ||
            this.state.schoolInfo.email === "" ||
            this.state.schoolInfo.phone_number === "" ||
            this.state.schoolInfo.password === "" ||
            this.state.schoolInfo.school_name === "" ||
            this.state.schoolInfo.school_address === "" ||
            this.state.confirmPass === "" ||
            this.state.termsAgreed == false 
        ){
           return alert("Please complete required details and agree the terms")
            // return ;
        }
        if (this.state.schoolInfo.password !== this.state.confirmPass){
           return alert("Passwords do not match")
            // return;
        }
            const data = this.state.schoolInfo
            this.setState({sloading: true})
            
            axios.post('https://tiltapp-api.herokuapp.com/registration/school',data).then(async res => {
                if (res.status){
                     await this.handleClick()
                     await this.clearScData()
                    
                     console.log(res)
                    this.setState({sloading: false})
                    this.props.history.push('/auth/login',{...data})

                    }else {
                        this.setState({sloading: false})
                       return alert("Could not register School at this moment, Please try Again")
                
                    }
                
            }).catch( err => {
                this.setState({sloading: false})
                // alert("Network error, Try Again")
                console.log(err);
            });
    }

     clearLnData(){
        this.setState({
            learnerInfo:{
                "first_name":"",
                "last_name":"",
                "middle_name":"",
                "email":"",
                "phone_number":"",
                "password":"",
                "confPass":"",
                "termsAgree":""

            }
        })
     } 

     clearScData(){
        this.setState({
            schoolInfo:{
            "school_name":"",
            "school_address": "",
            "school_description":"",
            "first_name":"",
            "last_name":"",
            "middle_name":"",
            "email":"",
            "phone_number":"",
            "password":"",
            "school_city":"",
            "school_zipcode":"",
            "school_state":"",
            "school_country":"",
            confirmPass:"",
            termsAgreed:""
        },
        })
     } 

     handleClick () {
        this.setState({open:true})
      };
    
       handleClose (event, reason) {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open:false})

      };

    ShowForm (){

    // PersonalRegForm = () =>{
        if (this.state.active === "personal"){
        return ( <form>
                {/* <h3 className="text-gray text-center mt-3">Create a personal Account</h3> */}
                <div className="form-row mt-3">
                    <div className="form-group col-6">
                        <div className="input-group">
                            <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="far fa-user"> </i>
                            </span>
                            </div>
                            <input type="text" className="form-control" id="input-last-name" 
                            placeholder="Last Name" 
                            required
                            value={this.state.learnerInfo.last_name}
                            onChange={value => this.setState({learnerInfo: {...this.state.learnerInfo,last_name: value.target.value.trim()}})}/>
                        </div>
                    </div>
                    <div className="form-group col-6">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="far fa-user"> </i>
                                </span>
                            </div>
                            <input type="text" className="form-control" id="input-first-name" 
                            placeholder="First Name" 
                            required
                            value={this.state.learnerInfo.first_name}
                            onChange={value => this.setState({learnerInfo: {...this.state.learnerInfo,first_name: value.target.value.trim()}})}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="far fa-envelope"> </i>
                                </span>
                        </div>
                        <input type="email" className="form-control" id="input-email" 
                        placeholder="Enter email" 
                        required
                        value={this.state.learnerInfo.email}
                        onChange={value => this.setState({learnerInfo: {...this.state.learnerInfo,email: value.target.value.trim()}})}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-phone"> </i>
                                </span>
                        </div>
                        <input type="phone" className="form-control" id="input-phone" 
                        placeholder="Phone Number" 
                        required
                        value={this.state.learnerInfo.phone_number}
                        onChange={value => this.setState({learnerInfo: {...this.state.learnerInfo,phone_number: value.target.value.trim()}})}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-unlock-alt"> </i>
                            </span>
                        </div>
                        <input className="form-control" placeholder="Password" 
                        type="password" required 
                        value={this.state.learnerInfo.password}
                        onChange={value => this.setState({learnerInfo: {...this.state.learnerInfo,password: value.target.value.trim()}})}/>
                        <div className="input-group-append">
                                <span className="input-group-text">
                                    <i className="far fa-eye"> </i>
                                </span>
                        </div>
                    </div>
                    <div className="input-group mt-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-unlock-alt"> </i>
                            </span>
                        </div>
                        <input type="password" className="form-control" id="input-password-confirm" 
                        placeholder="Confirm password" 
                        required 
                        value={this.state.confPass}
                        onChange={value => this.setState({confPass: value.target.value.trim()})}/>
                    </div>
                    <div className="d-block d-sm-flex justify-content-between align-items-center mt-2">
                        <div className="form-group form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox"
                                checked={this.state.termsAgree}
                                onChange={event => this.setState({termsAgree: event.target.checked })}/>
                                <span className="form-check-sign"> </span> I
                                agree to the <a href="terms.html">terms and conditions</a>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-block btn-primary" onClick={this.signUpLearner}>
                        {this.state.loading ? <Loader edge="end"
                            type="Oval"
                            color="white"
                            height={30}
                            width={30}
                            //  timeout={3000} //3 secs
                            /> : <span>Sign up</span> }
                        </button>
                </div>
                <div className="mt-3 mb-4 text-center">
                    <span className="font-weight-normal">or Register with</span>
                </div>
                <OauthSocialButtons/>
            </form>)
        }else {
    //  SchoolRegForm() {
        return <form >
            {/* <h3 className="text-gray text-center mt-3">Create an account for a school</h3> */}
            <div className="form-group mt-3">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fas fa-school"> </i>
                        </span>
                    </div>
                    <input type="text" className="form-control" id="input-school-name" 
                    placeholder="School Name" 
                    required
                    value={this.state.schoolInfo.school_name}
                    onChange={value => this.setState({schoolInfo: {...this.state.schoolInfo,school_name: value.target.value}})}/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="far fa-envelope"></i>
                        </span>
                    </div>
                    <input type="email" className="form-control" id="input-email" 
                    placeholder="School Email Address" 
                    required
                    value={this.state.schoolInfo.email}
                    onChange={value => this.setState({schoolInfo: {...this.state.schoolInfo,email: value.target.value.trim()}})}/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-phone"> </i>
                            </span>
                    </div>
                    <input type="phone" className="form-control" id="input-phone" 
                    placeholder="Phone Number" 
                    required
                    value={this.state.schoolInfo.phone_number}
                    onChange={value => this.setState({schoolInfo: {...this.state.schoolInfo,phone_number: value.target.value.trim()}})}/>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fas fa-map-pin"> </i>
                    </span>
                    </div>
                    <input type="text" className="form-control" id="input-school-name" 
                    placeholder="School Address" 
                    required
                    value={this.state.schoolInfo.school_address}
                    onChange={value => this.setState({schoolInfo: {...this.state.schoolInfo,school_address: value.target.value}})}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input type="text" className="form-control" id="inputCity" 
                    placeholder="City"
                    value={this.state.schoolInfo.school_city}
                    onChange={value => this.setState({schoolInfo: {...this.state.schoolInfo,school_city: value.target.value.trim()}})}/>
                </div>

                <div className="form-group col-6">
                    <input type="text" className="form-control" id="zip" 
                    placeholder="Enter Zip Code"
                    value={this.state.schoolInfo.school_zipcode}
                    onChange={value => this.setState({schoolInfo: {...this.state.schoolInfo,school_zipcode: value.target.value.trim()}})}/>
                </div>
            </div>
            <div className="form-row">
            <div className="form-group col-6">
                    <select className="custom-select" id="country"
                    value={this.state.schoolInfo.school_country}
                    onChange={this.selectState}>
                        <option >Select Country </option>
                        {this.state.countries.map((country, index) => {
                        return <option key={index} value={JSON.stringify(country)}>{country.name}</option>

                        })}
                        
                    </select>
                </div>
                <div className="form-group col-6">
                    <select className="custom-select" id="state"
                    value={this.state.schoolInfo.school_state}
                    disabled={this.state.allowState}
                    onChange={event => this.setState({schoolInfo: {...this.state.schoolInfo,school_state: event.target.value}})}>
                        <option >Select State </option>
                        {this.state.allstates.map((state, index) => {
                        return <option key={index} value={state.name}>{state.name}</option>

                        })}
                    </select>
                </div>
                
            </div>
            <hr/>
            <p className="text-gray">Administrator Information</p>
            <div className="form-row">
                <div className="form-group col-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="far fa-user"> </i>
                            </span>
                        </div>
                        <input type="text" className="form-control" id="input-first-name" 
                        placeholder="First Name" 
                        required
                        value={this.state.schoolInfo.first_name}
                    onChange={value => this.setState({schoolInfo: {...this.state.schoolInfo,first_name: value.target.value.trim()}})}/>
                    </div>
                </div>
                <div className="form-group col-6">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="far fa-user"> </i>
                            </span>
                        </div>
                        <input type="text" className="form-control" id="input-last-name" 
                        placeholder="Last Name" 
                        required
                        value={this.state.schoolInfo.last_name}
                        onChange={value => this.setState({schoolInfo: {...this.state.schoolInfo,last_name: value.target.value.trim()}})}/>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fas fa-unlock-alt"> </i>
                        </span>
                    </div>
                    <input className="form-control" placeholder="Password" 
                    type="password" required 
                    value={this.state.schoolInfo.password}
                    onChange={value => this.setState({schoolInfo: {...this.state.schoolInfo,password: value.target.value.trim()}})}/>
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <i className="far fa-eye"> </i>
                        </span>
                    </div>
                </div>
                <div className="input-group mt-3">
                    <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-unlock-alt"> </i>
                            </span>
                    </div>
                    <input type="password" className="form-control" id="input-password-confirm" 
                    placeholder="Confirm password" 
                    required 
                    value={this.state.confirmPass}
                        onChange={value => this.setState({confirmPass: value.target.value.trim()})}/>
                </div>
                <div className="d-block d-sm-flex justify-content-between align-items-center mt-2">
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox"
                            checked={this.state.termsAgreed}
                            onChange={event => this.setState({termsAgreed: event.target.checked })}/>
                            <span className="form-check-sign">
                            </span> I agree to the <a href="#">terms and conditions</a>
                        </label>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <button type="submit" className="btn btn-block btn-primary" onClick={this.signUpSchool}>
                {this.state.sloading ? <Loader edge="end"
                            type="Oval"
                            color="white"
                            height={30}
                            width={30}
                            //  timeout={3000} //3 secs
                            /> : <span>Sign up</span> }
                    </button>
            </div>
        </form>
    
    }

    };

        // {this.state.active === "personal" ?  this.PersonalRegForm() : this.SchoolRegForm()}

    setView = (type) => {
        this.setState({active: type})
    };

    render() {
        return (
            <AuthContainer
                title={"Register on TILT"}
                info={"Create a TILT Account"}
                    >
                <Snackbar open={this.state.open} autoHideDuration={4000} onClose={() => this.handleClose()}>
                    <Alert onClose={() => this.handleClose()} severity="success">
                    Success ! WELCOME TO TILT
                    </Alert>
                    </Snackbar>
                <div className="btn-group w-100">
                    <button
                        className={`btn btn-lg ${this.state.active === "personal" ?  "btn-gray" : "btn-gray-100"}`}
                        onClick={()=> this.setView("personal")}
                    >Personal Account</button>
                    <button
                        className={`btn btn-lg ${this.state.active === "school" ?  "btn-gray" : "btn-gray-100"}`}
                        onClick={() => this.setView("school")}
                    >School Account</button>
                </div>
                <div>
                {this.ShowForm()}
                </div>

                <div className="d-block d-sm-flex justify-content-center align-items-center mt-4">
                    <span className="font-weight-normal">Already have an account?
                        <a href="/auth/login" className="font-weight-bold">&nbsp; Login here</a>
                    </span>
                </div>
            </AuthContainer>
        );
    }
}

export default withRouter(Register);
