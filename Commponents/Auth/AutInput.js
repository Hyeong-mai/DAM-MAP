import styled from 'styled-components/native';

export const TextInput = styled.TextInput`
  background-color: ${props => props.theme.colors.bgColor};
  border: ${props => props.theme.colors.lineColor};
  width: 100%;
  color: ${props => props.theme.colors.fontColor};
  border-radius: 20px;
  padding: 15px 20px;
  margin-bottom: ${props => (props.lastOne ? '15' : 8)}px;
`;
