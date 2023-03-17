import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { divide } from "lodash";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
              />
            </div>
            <div className="col-12 form-group login-input">
              <lable>password:</lable>
              <input
                type="password"
                placeholder="Nhập vào mật khẩu"
                className="form-control"
              />
            </div>
            <div>
              <button className="btn-login"> Login</button>
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
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
