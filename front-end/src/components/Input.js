const Input = ({text, type, className, id, placeholder, value, onChange}) => {
  return (
    <div className="form-group my-4">
      <label htmlFor={id} className="mb-2">
        {text}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />{" "}
    </div>
  );
};

export default Input;
