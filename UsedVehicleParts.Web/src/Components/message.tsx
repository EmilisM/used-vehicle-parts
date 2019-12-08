import React, { ReactNode } from "react";

import styled from "styled-components";
import colors from "../Constants/colors";

interface MessageProps {
  type: string;
  children?: ReactNode;
  className?: string;
}

const MessageStyled = styled.div`
  background-color: ${({ type }: { type: string }) =>
    type === "error" ? colors.error : null};
  padding: 5px 10px;
  border: solid 1px;
  border-color: ${({ type }: { type: string }) =>
    type === "error" ? colors.errorBorder : null};
  width: 100%;
  border-radius: 4px
  color: ${({ type }: { type: string }) =>
    type === "error" ? colors.errorBorder : null};
  font-size: 15px;
`;

const Message = ({ className, type, children }: MessageProps) =>
  children ? (
    <MessageStyled className={className} type={type}>
      {children}
    </MessageStyled>
  ) : null;

export default Message;
