const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  },
  formRadio: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * -1
  },
  marginDense: {
    // marginTop: theme.spacing.unit * 2,
  },
  radioError: {
    marginTop: "0",
    minHeight: "0",
    "&$error": {
      marginTop: "initial",
      minHeight: "initial"
    }
  },
  dropdownError: {
    marginTop: "0",
    minHeight: "0",
    "&$error": {
      marginTop: "inherit",
      minHeight: "inherit"
    }
  },
  termsContainer: {
    border: "1px solid #bdbdbd",
    height: "50vh",
    overflowY: "scroll",
    marginBottom: theme.spacing.unit * 2
  },
  error: {},
  iconContainer: {
    color: "#fff",
    "& > svg": {
      color: "#b2006f!important"
    }
  },
  paperPadding: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16
  }),
  spacer: {
    marginTop: "15px",
    marginBottom: "15px"
  },

  bold: {
    fontWeight: "700"
  },
  homeNumber:{
    '& > div:first-child': {
      width: "80px",
      marginRight: '13px'
    },
    '& > div:last-child': {
      width: `calc(100% - 93px)`
    },
  },

  //react-select

  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden"
  },

  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 1
  }
});

export default styles;

