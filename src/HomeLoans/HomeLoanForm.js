/*eslint eqeqeq: [ 0 ]*/
import React, { Component, Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
// import 'typeface-roboto';
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
// import MaskedInput from 'react-text-mask';
import Input from "@material-ui/core/Input";
// import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Consumer } from "./HomeLoanContext";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import styles from "./ewccstyle";
import {
  citizenshipList,

} from "./LoansSpecialList";
import {
  StepButtons,
  DateCustom,
  MobileCustom,
  CurrencyCustom,
  SpecialSelect,
  maxDate,
  minDate,
  ReviewTableRow,
} from "./CommonComponents";

const employmentList = [
  { value: "1", label: "Self-employed" },
  { value: "5", label: "Select Me" },
];

const PersonalInformation = withStyles(styles)(function (props) {
  const { activeStep, handleBack, maxStep, classes } = props;

  return (
    <Consumer>
      {(context) => (
        <Formik
          initialValues={{
            firstname: context.firstname,
            bday: context.bday,
            citizenship: context.citizenship,
            mobilePhone: context.mobilePhone,
          }}
          validationSchema={Yup.object().shape({
            firstname: Yup.string()
              .min(2, "First name too short")
              .max(50, "First name is too long")
              .required("First name is required"),

            bday: Yup.string().required("Date of birth is required"),
            citizenship: Yup.string().required("Please select citizenship"),

            mobilePhone: Yup.string()
              .matches(
                /\(\d\d\)\s\d\d\d-\d\d\d-\d\d\d\d/,
                "Invalid Mobile Phone Number"
              )
              .required("Mobile Phone Number is required"),
          })}
          onSubmit={(values, actions) => {
            context.updateState("firstname", values.firstname);
            context.updateState("bday", values.bday);
            context.updateState("citizenship", values.citizenship);
            context.updateState("mobilePhone", values.mobilePhone);

            actions.setSubmitting(false);
            props.handleSubmit();
          }}
        >
          {(props) => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            } = props;
            return (
              <form>
                <FormControl fullWidth margin="dense">
                  <TextField
                    required
                    id="firstname"
                    label="First Name"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.firstname && touched.firstname ? true : false}
                    helperText={touched.firstname ? errors.firstname : ""}
                  />
                </FormControl>

                <FormControl fullWidth margin="dense">
                  <TextField
                    required
                    id="bday"
                    label="Date of Birth"
                    type="date"
                    // defaultValue="1980-01-24"
                    value={values.bday}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: minDate,
                      max: maxDate,
                    }}
                    classes={{ root: classes.marginDense }}
                    error={errors.bday && touched.bday ? true : false}
                    helperText={touched.bday ? errors.bday : ""}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={
                    errors.citizenship && touched.citizenship ? true : false
                  }
                >
                  <InputLabel required htmlFor="citizenship">
                    Citizenship
                  </InputLabel>
                  <SpecialSelect
                    id="citizenship"
                    name="citizenship"
                    value={values.citizenship}
                    onChange={setFieldValue}
                    onBlur={handleBlur}
                    options={citizenshipList}
                  />
                  <FormHelperText
                    margin="dense"
                    classes={{
                      root: classes.dropdownError,
                      error: classes.error,
                    }}
                    component="p"
                  >
                    {errors.citizenship && touched.citizenship && (
                      <Fragment>{errors.citizenship}</Fragment>
                    )}
                  </FormHelperText>
                </FormControl>

                <FormControl
                  fullWidth
                  margin="dense"
                  error={
                    errors.mobilePhone && touched.mobilePhone ? true : false
                  }
                >
                  <InputLabel required htmlFor="mobilePhone">
                    Mobile Phone No
                  </InputLabel>
                  <Input
                    id="mobilePhone"
                    value={values.mobilePhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors.mobilePhone && touched.mobilePhone ? true : false
                    }
                    inputComponent={MobileCustom}
                  />
                  <FormHelperText
                    classes={{
                      // root: classes.phoneError,
                      root: classes.dropdownError,
                      error: classes.error,
                    }}
                    component="p"
                  >
                    {/*<Fragment>{touched.mobilePhone == true ? errors.mobilePhone : '(input NA if not applicable)'}</Fragment>*/}
                    {errors.mobilePhone && touched.mobilePhone && (
                      <Fragment>{errors.mobilePhone}</Fragment>
                    )}
                  </FormHelperText>
                </FormControl>

                <StepButtons
                  isSubmitting={isSubmitting}
                  activestep={activeStep}
                  maxstep={maxStep}
                  handleBack={handleBack}
                  handleNext={handleSubmit}
                />
              </form>
            );
          }}
        </Formik>
      )}
    </Consumer>
  );
});

const LoanInformation = withStyles(styles)(function (props) {
  const { activeStep, handleBack, maxStep, classes } = props;

  return (
    <Consumer>
      {(context) => (
        <Formik
          initialValues={{
            loanAmount: context.loanAmount,

            propertyMortgaged: context.propertyMortgaged,

            monthlyAmortization: context.monthlyAmortization,
          }}
          validationSchema={Yup.object().shape({
            loanAmount: Yup.string()
              .max(16, "Invalid value")
              .required("Please input loan amount"),

            propertyMortgaged: Yup.string().required("Please select yes or no"),

            monthlyAmortization: Yup.string()
              .max(16, "Invalid value")
              .when("propertyMortgaged", {
                is: (propertyMortgaged) => propertyMortgaged == "Yes",
                then: Yup.string().required(
                  "Please input monthly amortization"
                ),
              }),
              memberSince1: Yup.string().when("activeCCOtherBanks", {
                is: (activeCCOtherBanks) => activeCCOtherBanks == "Yes",
                then: Yup.string().required("Please validate"),
                // then: Yup.string().matches(/\d\d\/\\d\d\d\d/, "Invalid Phone Number").required('Please validate')
              }),
          })}
          onSubmit={(values, actions) => {
            context.updateState("loanAmount", values.loanAmount);
            context.updateState("propertyMortgaged", values.propertyMortgaged);
            context.updateState(
              "monthlyAmortization",
              values.monthlyAmortization
            );
            context.updateState("memberSince1", values.memberSince1);

            actions.setSubmitting(false);
            props.handleSubmit();
          }}
        >
          {(props) => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            } = props;
            return (
              <form>
                <FormControl fullWidth margin="dense">
                  <TextField
                    required
                    id="loanAmount"
                    label="Loan Amount"
                    value={values.loanAmount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      touched.loanAmount
                        ? errors.loanAmount
                        : "Should match income document submitted"
                    }
                    error={
                      errors.loanAmount && touched.loanAmount ? true : false
                    }
                    InputProps={{
                      inputComponent: CurrencyCustom,
                    }}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  error={
                    errors.memberSince1 && touched.memberSince1 ? true : false
                  }
                >
                  <InputLabel required htmlFor="memberSince1">
                    Member Since
                  </InputLabel>
                  <Input
                    id="memberSince1"
                    value={values.memberSince1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors.memberSince1 && touched.memberSince1 ? true : false
                    }
                    inputComponent={DateCustom}
                  />
                  <FormHelperText
                    margin="dense"
                    classes={{
                      root: classes.dropdownError,
                      error: classes.error,
                    }}
                    component="p"
                  >
                    {errors.memberSince1 && touched.memberSince1 && (
                      <>{errors.memberSince1}</>
                    )}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  required
                  className={classes.formRadio}
                  fullWidth
                  error={
                    errors.propertyMortgaged && touched.propertyMortgaged
                      ? true
                      : false
                  }
                >
                  <FormLabel component="legend">
                    Is property/collateral presently mortgaged?
                  </FormLabel>
                  <RadioGroup
                    required
                    aria-label=""
                    name="propertyMortgaged"
                    value={values.propertyMortgaged}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  <FormHelperText
                    margin="dense"
                    classes={{
                      root: classes.radioError,
                      error: classes.error,
                    }}
                    component="p"
                  >
                    {errors.propertyMortgaged && touched.propertyMortgaged && (
                      <Fragment>{errors.propertyMortgaged}</Fragment>
                    )}
                  </FormHelperText>
                </FormControl>
                {values.propertyMortgaged == "Yes" ? (
                  <Fragment>
                    <FormControl fullWidth margin="dense">
                      <TextField
                        required
                        id="monthlyAmortization"
                        label="Monthly Amortization"
                        value={values.monthlyAmortization}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          touched.monthlyAmortization
                            ? errors.monthlyAmortization
                            : "Should match income document submitted"
                        }
                        error={
                          errors.monthlyAmortization &&
                          touched.monthlyAmortization
                            ? true
                            : false
                        }
                        InputProps={{
                          inputComponent: CurrencyCustom,
                        }}
                      />
                    </FormControl>
                  </Fragment>
                ) : (
                  ""
                )}
                <StepButtons
                  isSubmitting={isSubmitting}
                  activestep={activeStep}
                  maxstep={maxStep}
                  handleBack={handleBack}
                  handleNext={handleSubmit}
                />
              </form>
            );
          }}
        </Formik>
      )}
    </Consumer>
  );
});

const ReviewDetails = withStyles(styles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false,
      };
    }

    render() {
      const {
        classes,
        handleEdit,
        handleBack,
        activeStep,
        maxStep,
      } = this.props;
      // if (this.state.redirect) {
      // return <Redirect to="/loans/homeloans/thankyou" />;
      // return (
      // <Redirect
      //   to={{
      //     pathname: "/loans/homeloans/thankyou",
      //     state: {
      //       referencenumber: Math.floor(Math.random() * 90000) + 10000,
      //     },
      //   }}
      // />
      // );
      // }
      return (
        <Consumer>
          {(context) => (
            <Formik
              onSubmit={(values, actions) => {
                //save form data
                var testx = new FormData();
                testx.append("firstname", context.firstname);
  
                testx.append("bday", context.bday);
                testx.append("citizenship", context.citizenship.value);
                testx.append("mobilePhone", context.mobilePhone);
                testx.append("loanAmount", context.loanAmount);
                testx.append("memberSince1", context.memberSince1);
                testx.append(
                  "propertyMortgaged",
                  context.propertyMortgaged
                );

                testx.append(
                  "monthlyAmortization",
                  context.monthlyAmortization
                );

                fetch({
                  method: "POST",
                  body: testx,
                })
                  .then((response) => {
                    if (response.ok) {
                      // window.dataLayer.push({
                      //     'ewformeventcat': 'EW Time Deposit Application Form Submit',
                      //     'ewformeventaction': 'Details successfully saved!',
                      //     'event': 'ewformevent'
                      //   });

                      this.props.handleSubmit(true);
                      actions.setSubmitting(false);
                      context.resetForm();
                      this.setState({
                        redirect: true,
                      });
                    } else {
                      alert("Error: Unable to connect to API!");
                    }
                  })
                  .catch((err) => {
                    // console.log(err);
                    // this.setState({
                    //   erroralert: true,
                    //   btnDisabled: false
                    // });

                    // window.dataLayer.push({
                    // 	'ewformeventcat': 'EW Time Deposit Application Form Submit',
                    // 	'ewformeventaction': 'API Error!!!',
                    // 	'event': 'ewformevent'
                    // });

                    alert("Error: Unable to connect to API!");
                  });
              }}
            >
              {({
                // values,
                // errors,
                // touched,
                // handleChange,
                // handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <div>
                  <Table className={classes.table}>
                    <TableBody>
                      <ReviewTableRow
                        handleEdit={handleEdit}
                        value="2"
                        headerText="First Name"
                        bodyText={context.firstname}
                      />
                      <ReviewTableRow
                        handleEdit={handleEdit}
                        value="2"
                        headerText="Date of Birth"
                        bodyText={context.bday}
                      />
                      <ReviewTableRow
                        handleEdit={handleEdit}
                        value="2"
                        headerText="Citizenship"
                        bodyText={context.citizenship.label}
                      />

                      <ReviewTableRow
                        handleEdit={handleEdit}
                        value="2"
                        headerText="Mobile Phone No"
                        bodyText={context.mobilePhone}
                      />

                      <ReviewTableRow
                        handleEdit={handleEdit}
                        value="1"
                        headerText="Loan Amount"
                        bodyText={context.loanAmount}
                      />

                      <ReviewTableRow
                        handleEdit={handleEdit}
                        value="1"
                        headerText="Is property/collateral presently mortgaged?"
                        bodyText={context.propertyMortgaged}
                      />
                      {context.propertyMortgaged === "Yes" ? (
                        <Fragment>
                          <ReviewTableRow
                            handleEdit={handleEdit}
                            value="1"
                            headerText="Monthly Amortization"
                            bodyText={context.monthlyAmortization}
                          />
                        </Fragment>
                      ) : (
                        ""
                      )}

                      <ReviewTableRow
                        handleEdit={handleEdit}
                        value="1"
                        headerText="Member Since"
                        bodyText={context.memberSince1}
                      />
                    </TableBody>
                  </Table>

                  <StepButtons
                    isSubmitting={isSubmitting}
                    activestep={activeStep}
                    maxstep={maxStep}
                    handleBack={handleBack}
                    handleNext={handleSubmit}
                  />
                </div>
              )}
            </Formik>
          )}
        </Consumer>
      );
    }
  }
);

function getSteps() {
  return [
    "Personal Information",
    "Loan Information",
    "Review details",
  ];
}

function ShowContent(props) {
  const { step } = props;
  switch (step) {
    case 0:
      // return <EmploymentInformation {...props} />;

      return <PersonalInformation {...props} />;
    case 1:
      return <LoanInformation {...props} />;
    // return <ReviewDetails {...props} />;
    case 2:
      return <ReviewDetails {...props} />;
    default:
      return "Unknown step";
  }
}

class HomeLoanForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  handleNext = (ismax) => {
    // console.log('max: ' + ismax)
    if (!ismax) {
      this.setState((state) => ({
        activeStep: state.activeStep + 1,
      }));
    } else {
      this.props.handleClose();
    }
  };

  handleEdit = (step) => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - step,
    }));
    window.scrollTo(0, 0);
  };

  handleBack = () => {
    this.setState((state) => ({
      activeStep: state.activeStep - 1,
    }));
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const maxStep = steps.length - 1;
    const { activeStep } = this.state;
    return (
      <div className="gridContainer">
        <Grid
          container
          className={classnames(classes.spacer, classes.paperPadding)}
        >
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel
                    classes={{
                      iconContainer: classes.iconContainer,
                    }}
                  >
                    {label}
                  </StepLabel>
                  <StepContent>
                    <ShowContent
                      step={index}
                      handleBack={this.handleBack}
                      handleSubmit={this.handleNext}
                      handleEdit={this.handleEdit}
                      activeStep={activeStep}
                      maxStep={maxStep}
                    />
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HomeLoanForm);
