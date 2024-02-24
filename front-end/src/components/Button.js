import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => (colorSchemaByType(props).bg)};
  color: ${(props) => (colorSchemaByType(props).color)};

  &:hover {
    background-color: ${(props) => (colorSchemaByType(props).hover)};
    color: ${(props) => (colorSchemaByType(props).color)};
  }
`;

const colorSchemaByType = (props) => {
  switch(props.kind) {
    case "danger":
      return {
        bg: "#ffd2cb",
        hover: "#ffd2cb",
        color: "#ff4a2d"
      }
    case "warning":
      return {
        bg: "#F5C69C",
        hover: "#F5C69C",
        color: "#cc6c18"
      }
    default:
      return {
        bg: "#601349",
        hover: "#963579",
        color: "#fff"
      };
  }
}

const Button = ({ onClick, text, css, kind }) => {
  const combinedClassName = `btn ${css}`;
  return (
    <StyledButton className={combinedClassName} onClick={onClick} kind={kind}>
      {text}
    </StyledButton>
  );
};

export default Button;
