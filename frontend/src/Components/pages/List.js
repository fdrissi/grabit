import React from 'react'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  List: {
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "900",
  },
})

export default ({ items }) => {
  const classes = useStyles();
  return (
    <div >
      {
        items.map((item, i) => (
          <span key={i} className={classes.list}>
            {`${item}, `}
          </span>
        ))
      }
    </div>
  );
}
