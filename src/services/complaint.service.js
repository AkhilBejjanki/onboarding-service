const transitions = {
  raised: ["in_progress"],
  in_progress: ["waiting_on_user", "resolved"],
  waiting_on_user: ["in_progress"],
  resolved: ["closed"],
};

const isValidTransition = (from, to) =>
  transitions[from]?.includes(to);

module.exports = { isValidTransition };
