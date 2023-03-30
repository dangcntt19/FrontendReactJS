import { first } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      // gender: "",
      // phoneNumber: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
    console.log("check did", this.props.currentUser);
  }
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState(
      {
        ...copyState,
      },
      () => {}
    );
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];

    for (let i = 0; i < arrInput.length; i++) {
      console.log(arrInput[i], this.state[arrInput[i]]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter:" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call API edit
      this.props.edituser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit new user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                value={this.state.email}
                disabled
                onChange={(event) => {
                  this.handleOnChangInput(event, "email");
                }}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                disabled
                onChange={(event) => {
                  this.handleOnChangInput(event, "password");
                }}
              />
            </div>
            <div className="input-container">
              <label>First name</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(event) => {
                  this.handleOnChangInput(event, "firstName");
                }}
              />
            </div>
            <div className="input-container">
              <label>Last name</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(event) => {
                  this.handleOnChangInput(event, "lastName");
                }}
              />
            </div>
            {/* <div className="input-container">
              <label>Phone number</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(event) => {
                  this.handleOnChangInput(event, "phoneNumber");
                }}
              />
            </div> */}
            {/* coi lại giới tính */}
            {/* <div className="input-container">
              <label>Gender</label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={this.state.gender || 0}
              >
               
                <option selected>--Chọn--</option>
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
            </div> */}
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(event) => {
                  this.handleOnChangInput(event, "address");
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Save changes
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
