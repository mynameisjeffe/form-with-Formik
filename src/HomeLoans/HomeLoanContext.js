import React, { Component } from "react";

const { Provider, Consumer } = React.createContext();

class InitHomeLoanProvider extends Component {
  state = {
    firstname: "",
    bday: "",
    citizenship: "",
    mobilePhone: "",
    loanAmount: "",
    propertyMortgaged: "",
    monthlyAmortization: "",
    memberSince1: "",

    // referenceNumber: '',
  };

  render() {
    return (
      <Provider
        value={{
          firstname: this.state.firstname,
          bday: this.state.bday,
          citizenship: this.state.citizenship,
          mobilePhone: this.state.mobilePhone,
          loanAmount: this.state.loanAmount,
          propertyMortgaged: this.state.propertyMortgaged,
          monthlyAmortization: this.state.monthlyAmortization,
          memberSince1: this.state.memberSince1,
          // referenceNumber: this.state..referenceNumber,
          handleInputChange: (event) => {
            const target = event.target;
            const value = target.value;
            const firstname = target.name;

            this.setState({
              [firstname]: value,
            });
          },
          updateState: (sname, inval) => {
            this.setState({
              [sname]: inval,
            });
          },
          resetForm: () => {
            this.setState({
              firstname: "",
              bday: "",
              citizenship: "",
              mobilePhone: "",
              loanAmount: "",
              propertyMortgaged: "",
              monthlyAmortization: "",
  
              memberSince1: "",
            });
          },
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { InitHomeLoanProvider, Consumer };
