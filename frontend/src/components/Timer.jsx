import PropTypes from "prop-types";

import { useInterval, formatTime } from "../utils/utils";
import { useState } from "react";

export default function Timer({
  started,
  endGame,
  timeRemaining,
  setTimeRemaining,
}) {
  useInterval(() => {
    if (started && timeRemaining <= 0) {
      endGame();
    }
    if (started && timeRemaining > 0) {
      setTimeRemaining(timeRemaining - 1);
    }
  }, 1000);

  const timeFormatted = formatTime(timeRemaining);

  return timeFormatted;
}

Timer.propTypes = {
  started: PropTypes.bool,
};
