import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #601349;
  color: #fff;

  &:hover {
    background-color: #963579;
    color: #fff;
  }
`;

const Button = ({ onClick, text }) => {
  return (
    <div className="d-flex justify-content-center">
      <StyledButton className="btn mt-4 btn-lg" onClick={onClick}>
        {text}
      </StyledButton>
    </div>
  );
};

export default Button;
