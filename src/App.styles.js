const styles = theme => ({
  calcContainer: {
    width: 320,
    display: "flex",
    flexWrap: "wrap",
    justifyItems: "center"
  },
  informationDisplay: {
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: "thin",
    borderColor: "black",
    background: "#93c542",
    width: "100%"
  },
  headerRow: {
    display: "flex",
    flex: "0 0 100%",
  },
  row: {
    display: "flex",
    flex: "0 0 auto",
    justifyItems: "center"
  },
  clearButton: {
    justifyContent: "flex-end"
  },
  numberButton: {
    borderRadius: 0,
    width: theme.spacing(10)
  },
  operatorButton: {
    borderRadius: 0,
    width: theme.spacing(10),
    color: "gray"
  },
});

export default styles;