import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./login.css";
// import M from "materialize-css";
import Navbar from "../../components/navbar_metcss";

// import { Alert } from "reactstrap";

const jsonwebtoken = require("jsonwebtoken");
//const request = require("request");
const axios = require("axios");

class login extends Component {
  state = {
    token: "",
    // email: "",
    // password: "",
    loggedIn: false,
    showError: false,
    showNullError: false,
    creaderror: false
  };

  changehandleremail = event => {
    this.setState({
      email: event.target.value
    });
  };

  changehandlerpass = event => {
    this.setState({
      password: event.target.value
    });
  };

  componentDidMount() {
    //M.toast({ html: "I am a toast!" });
    var jwt = localStorage.getItem("jwt");
    console.log("comp mount");
    console.log(jwt);
    try {
      var tk = jsonwebtoken.verify(jwt, "authdemo");
      if (tk) {
        console.log("loged in");
        this.setState({
          loggedIn: true,
          email: tk.email
        });
      }
    } catch (error) {
      console.log("not logged in" + error);

      this.setState({
        loggedIn: false
      });
    }
  }

  btn1handler = e => {
    e.preventDefault();

    // this.setState({ creaderror: true });
    console.log("cliking");

    if (this.state.email === "" || this.state.password === "") {
      console.log(this.state.email + "   " + this.state.password);
      console.log("wtf");
      this.setState({
        loggedIn: false,
        showError: false,
        showNullError: true
      });
    } else {
      console.log("sending..............");
      console.log(this.state.email + this.state.password);

      var params = new URLSearchParams();
      params.append("email", this.state.email);
      params.append("password", this.state.password);
      // data: {
      //   email: this.state.email,
      //   password: this.state.password
      // }

      axios
        .post("http://localhost:3001/api/login", {"email":this.state.email,"password": this.state.password})
        .then(data => {
          console.log("awe mewwa - - -popopopopo");
          console.log(data);
          var body = data.data;

          if (body) {
            console.log("body - " + body);
            localStorage.setItem("jwt", body.jwt);

            this.setState({
              loggedIn: true,
              showError: false,
              showNullError: false
            });
          } else {
            this.setState({ creaderror: true });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loggedIn: false,
            showError: true,
            showNullError: false
          });
        });

      // axios.post("/usr/login1", params, (err, res, body) => {
      //   console.log("errr - " + err);
      //   console.log("response - " + res);
      //   console.log("body - " + body);

      //   if (body !== "false") {
      // console.log("body - " + body);
      // localStorage.setItem("jwt", body);

      // this.setState({
      //   loggedIn: true,
      //   showError: false,
      //   showNullError: false
      // });
      //   } else {
      //     console.log(err);
      // this.setState({
      //   loggedIn: false,
      //   showError: true,
      //   showNullError: false
      // });
      //   }

      //   // this.setState({ email: data.email, id: data.id });
      // });
    }
  };

  render() {
    const { email, password, showError, loggedIn, showNullError } = this.state;

    if (!loggedIn) {
      return (
        <div className="maindiv">
          <div className="wrapper">
            <div className="form-wrapper">
              <div>
                {/* <Alert color="danger">reset link set to your email</Alert>
                <br />
                <Alert color="primary">
                  This is a primary alert with{" "}
                  <a href="#" className="alert-link">
                    an example link
                  </a>
                  . Give it a click if you like.
                </Alert> */}

                {/* <div className="row">
                  <div className="col-sm" />
                  <div className="col-sm"> */}
                {this.state.creaderror && (
                  <div class="alert alert-danger" role="alert">
                    Invalid Creadentials
                  </div>
                )}
                <form onSubmit={this.btn1handler}>
                  <br />
                  <br />
                  <br />
                  <div className="form-group">
                    {/* <label> enter email </label> */}
                    <input
                      id="uname"
                      required
                      type="text"
                      name="uname"
                      className="form-control"
                      onChange={this.changehandleremail}
                      placeholder="enter email"
                    />
                  </div>
                  <div className="form-group">
                    {/* <label> enter password </label> */}
                    <input
                      required
                      id="pass"
                      type="password"
                      name="pass"
                      className="form-control"
                      placeholder="enter password"
                      onChange={this.changehandlerpass}
                    />
                  </div>
                  <div className="submit">
                    <input
                      type="submit"
                      className="btn  waves-light light-blue darken-3"
                      value="sign in"
                      id="submit"
                    />
                  </div>
                </form>
                <br />
                <br />

                <div>
                  <Link to="/fogotpassword">
                    <a>Forgotten password</a>
                  </Link>
                </div>

                {showNullError && (
                  <div>
                    <p>The username or password cannot be null.</p>
                  </div>
                )}

                {showError && (
                  <div>
                    <p>The username or password is incorrect dude XD.</p>
                  </div>
                )}
              </div>
              <div className="col-sm" />
              {/* </div>
              </div>*/}
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to={`/dashboard`} />;
    }
  }
}

export default login;
