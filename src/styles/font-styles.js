import styled from "styled-components";

export const H1 = styled.p`
  font-size: 60px;
  font-weight: 800;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => color && theme.colors[color] ? theme.colors[color] : theme.colors.black};
  ${({ theme, color }) => color && theme.gradients[color] && `
    background: ${theme.gradients[color]};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  `}
  margin: 0;
`;

export const H2 = styled.p`
  font-size: 40px;
  font-weight: 800;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const H3 = styled.p`
  font-size: 32px;
  font-weight: 800;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const H4 = styled.p`
  font-size: 26px;
  font-weight: 800;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const H5 = styled.p`
  font-size: 20px;
  font-weight: 700;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const H6 = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const H7 = styled.p`
  font-size: 12px;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const B1 = styled.p`
  font-size: 26px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const B2 = styled.p`
  font-size: 24px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const B3 = styled.p`
  font-size: 20px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const B4 = styled.p`
  font-size: 18px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const B5 = styled.p`
  font-size: 16px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const B6 = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const B7 = styled.p`
  font-size: 12px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const B8 = styled.p`
  font-size: 10px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;

export const B9 = styled.p`
  font-size: 8px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
  color: ${({ theme, color }) => (color ? theme.colors[color] : "black")};
  margin: 0;
`;