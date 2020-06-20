const SPRINT_TIME_LIMIT = 60;

const SPRINT_WARNING_THRESHOLD = 30;
const FULL_DASH_ARRAY = 283;
const SPRINT_ALERT_THRESHOLD = 15;

const SPRINT_COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: SPRINT_WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: SPRINT_ALERT_THRESHOLD
  }
};


export {SPRINT_TIME_LIMIT, SPRINT_COLOR_CODES, FULL_DASH_ARRAY}