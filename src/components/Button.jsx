import PropTypes from "prop-types";

export default function Button({
  text = "",
  color = "",
  textColor = "",
  onClick,
}) {
  return (
    <button
      className="btn"
      style={{ color: textColor, background: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
};
