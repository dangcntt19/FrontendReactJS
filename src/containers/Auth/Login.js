import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { divide } from "lodash";
import { handleLoginApi } from "../../services/userService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }
  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
      // password: event.target.value,
    });
  };
  handleChangePassword = (event) => {
    this.setState({
      // username: event.target.value,
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });

    // console.log(this.state.username);
    // console.log(this.state.password);
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      console.log(data);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("login succeeds");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    //
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12  text-login">Login</div>
            <div className="col-12 form-group login-input">
              <lable>Usename:</lable>
              <input
                type="text"
                placeholder=" Nhập vào tài khoản"
                className="form-control"
                value={this.state.username}
                onChange={(event) => this.handleChangeUsername(event)}
              />
            </div>

            <div className="col-12 form-group login-input">
              <lable>password:</lable>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Nhập vào mật khẩu"
                  className="form-control"
                  value={this.state.password}
                  onChange={(event) => this.handleChangePassword(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? " far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
            </div>

            <div>
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>

            <div className="col-12 ">
              <span className="forgot-password">Forgot your password?</span>
            </div>

            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or login with</span>
            </div>

            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
