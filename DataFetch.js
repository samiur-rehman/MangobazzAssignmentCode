import React, { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./DataFetch.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ReplayRounded } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  root: {
    position: "relative",
    marginTop: "50px",
    maxWidth: 350,
    minWidth: 350,
    height: 450,
  },
});

function DataFetch() {
  const classes = useStyles();

  const [advice, setadvice] = useState([]);
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const FetchData = async () => {
      await axios
        .get(`https://api.adviceslip.com/advice`)
        .then((response) => {
          setadvice(response.data.slip);
          console.log(response.data.slip);
        })
        .catch(() => {
          alert("Invalid call to Api");
        });
    };
    FetchData();
  }, []);

  const EventHandle = () => {
    const FetchData = async () => {
      await axios
        .get(`https://api.adviceslip.com/advice`)
        .then((response) => {
          setadvice(response.data.slip);
          console.log(response.data.slip);
        })
        .catch(() => {
          alert("Invalid call to Api");
        });
    };
    FetchData();
  };

  //tweetcode
  const TweetAdvice = () => {
    setShow(advice.advice);
  };

  return (
    <div className="container">
      <Card xs={12} sm={12} className={classes.root}>
        <CardContent>
          <Typography className="tweet" color="textSecondary" gutterBottom>
            <p>{show}</p>
          </Typography>

          <Typography variant="body2" component="p" className="advice">
            <p> {advice.advice}</p>
          </Typography>
        </CardContent>
        <CardActions className="buttonsReplay">
          <button
            className="btnReplay"
            variant="contained"
            onClick={EventHandle}
          >
            <ReplayRounded />
          </button>
        </CardActions>

        <CardActions className="buttons">
          <CopyToClipboard text={advice.advice} onCopy={() => setCopied(true)}>
            <Tooltip title="Click to Copy for ClipBoard" arrow placement="top">
              <Button variant="contained" color="primary">
                Copy
              </Button>
            </Tooltip>
          </CopyToClipboard>
          <Button variant="contained" color="primary" onClick={TweetAdvice}>
            Tweet
          </Button>
        </CardActions>
      </Card>
    </div>
    // </div>
  );
}

export default DataFetch;
