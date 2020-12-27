import React from "react-dom";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://https://hireme.io/">
        Gentis App
      </Link>
      {new Date().getFullYear()} <br></br>
      Mouaad OUKERROU
    </Typography>
  );
}

export default Footer;
