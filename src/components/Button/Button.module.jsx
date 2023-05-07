import styled from '@emotion/styled';

export const ButtonLoad = styled.button`
  width: 120px;
  height: 48px;

  line-height: 100%;
  text-align: center;
  color: #ffffff;

  border-radius: 12px;

  background: linear-gradient(180deg, #40df9f 0%, #3ed598 100%);
  box-shadow: 0px 2px 4px rgba(15, 218, 137, 0.3);

  transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover,
  :focus {
    background: #286053;
  }

  // padding: 8px 16px;
  // border-radius: 2px;
  // background-color: #3f51b5;
  // transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  // text-align: center;
  // display: inline-block;
  // color: #fff;
  // border: 0;
  // text-decoration: none;
  // cursor: pointer;
  // font-family: inherit;
  // font-size: 18px;
  // line-height: 24px;
  // font-style: normal;
  // font-weight: 500;
  // min-width: 180px;
  // box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
  //   0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;
