// import FormHelperText from "@material-ui/core/FormHelperText";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import ReactSelect from "react-select";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import NoSsr from "@material-ui/core/NoSsr";
import Edit from "@material-ui/icons/Edit";
import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
// import 'typeface-roboto';
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import styles from "./ewccstyle";

export const StepButtons = withStyles(styles)(function (props) {
  const { classes, activestep, handleBack, handleNext, maxstep } = props;
  return (
    <div className={classes.actionsContainer}>
      <div>
        <Button
          disabled={activestep == 0 ? true : false}
          onClick={handleBack}
          className={classes.button}
        >
          Back
        </Button>
        {activestep >= maxstep ? (
          <Button
            //   variant="outlined"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleNext}
            disabled={props.isSubmitting}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            className={classes.button}
            disabled={props.isSubmitting}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
});


export const MobileCustom = function (props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      // mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      mask={[
        "(",
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholder="(63) 998-1234-5678"
      placeholderChar={"x"}
      guide={true}
    />
  );
};

export const CurrencyCustom = function (props) {
  const { inputRef, ...other } = props;

  const numberMask = createNumberMask({
    prefix: "PHP ",
    integerLimit: 9,
  });
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={numberMask}
      placeholderChar={"\u2000"}
    />
  );
};

export const ReviewTableRow = withStyles(styles)(function ({
  classes,
  handleEdit,
  value,
  headerText,
  bodyText,
}) {
  return (
    <>
      <TableRow>
        <TableCell>
          <Typography variant="body1">
            {headerText}
            <Button onClick={() => handleEdit(`${value}`)}>
              <Edit className={classes.rightIcon} />
            </Button>
          </Typography>
          <Typography variant="body1" gutterBottom>
            {bodyText}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
});

const date = new Date().getFullYear();
const autoCorrectedDatePipe = createAutoCorrectedDatePipe("mm/yyyy", {
  maxYear: date,
});

export const DateCustom = function (props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      // keepCharPositions={true}
      pipe={autoCorrectedDatePipe}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
      placeholder="09/2010"
      placeholderChar={"x"}
      guide={true}
    />
  );
};

export const SpecialRadioGroup = withStyles(styles)(
  class extends Component {
    handleChange = (event) => {
      var tempVal = this.props.options.find(function (option) {
        return option.value === event.target.value;
      });

      this.props.onChange(this.props.name, tempVal);
    };

    render() {
      const { classes } = this.props;
      return (
        <RadioGroup
          aria-label=""
          name={this.props.name}
          className={classes.group}
          value={this.props.value.value}
          onChange={this.handleChange}
          onBlur={this.props.onBlur}
        >
          {this.props.options.map((option, index) => {
            return (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            );
          })}
        </RadioGroup>
      );
    }
  }
);

export const SpecialSelect = withStyles(styles)(
  class extends Component {
    // constructor(props) {
    //   super(props);
    // }

    handleChange = (event) => {
      var tempVal = this.props.options.find(function (option) {
        return option.value === event.target.value;
      });

      this.props.onChange(this.props.name, tempVal);
    };

    render() {
      // const { classes } = this.props;
      return (
        <Select
          native
          value={this.props.value == undefined ? null : this.props.value.value}
          onChange={this.handleChange}
          onBlur={this.props.onBlur}
          inputProps={{
            name: this.props.name,
            id: this.props.id,
          }}
        >
          <option value="" />
          {this.props.options.map((option, index) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </Select>
        // <RadioGroup
        //   aria-label=""
        //   name={this.props.name}
        //   className={classes.group}
        //   value={this.props.value.value}
        //   onChange={this.handleChange}
        //   onBlur={this.props.onBlur}
        // >
        //   {this.props.options.map((option, index) => {
        //     return (
        //       <FormControlLabel
        //         key={index}
        //         value={option.value}
        //         control={<Radio />}
        //         label={option.label}
        //       />
        //     );
        //   })}
        // </RadioGroup>
      );
    }
  }
);

export const SpecialReactSelect = withStyles(styles, { withTheme: true })(
  class extends React.Component {
    handleChange = (value) => {
      this.props.onChange(this.props.id, value);
    };

    handleBlur = () => {
      // this is going to call setFieldTouched and manually update touched.topcis
      this.props.onBlur(this.props.id, true);
    };

    render() {
      const { classes } = this.props;

      return (
        <NoSsr>
          <ReactSelect
            classes={classes}
            // styles={selectStyles}
            options={this.props.options}
            components={components}
            value={this.props.value}
            onChange={this.handleChange}
            placeholder={this.props.placeholder}
            isClearable
            onBlur={this.handleBlur}
          />
          <div className={classes.divider} />
          {/* {console.log(this.props.options)}
          {this.props.branchvalue === null ? '' : this.props.branchvalue.address}
            {!!this.props.error && this.props.touched && (
              <div style={{ color: "red", marginTop: ".5rem" }}>
                {this.props.error}
              </div>
            )} */}
        </NoSsr>
      );
    }
  }
);

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

const components = {
  Control,
  Menu,
  // MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

function createDate(years) {
  var date = new Date();
  date.setFullYear(date.getFullYear() + years);
  return date.toISOString().split("T")[0];
}

export function setDateBackEnd(years) {
  var date = new Date(years);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;

  var dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return month + "/" + dt + "/" + year;
}

export const maxDate18 = createDate(-18);
export const maxDate = createDate(-21);
export const minDate = createDate(-80);
