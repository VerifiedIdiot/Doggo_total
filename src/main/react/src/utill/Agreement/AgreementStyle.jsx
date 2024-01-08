import { styled } from "styled-components";

const AgreementContent = styled.div`
  width: 96%;
  margin: 0 auto;
  height: 100%;
  font-size: 0.8rem;
  line-height: 1rem;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  overflow-y: scroll;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  h1 {
    color: #333;
    font-weight: bold;
    font-size: 1rem;
  }
  .term_title {
    color: #333;
    font-weight: bold;
    margin-bottom: 10px;
  }
  ol {
    list-style-type: decimal;
    margin-left: 10px;
  }
  ul {
    margin-left: 10px;
  }
  .ul_square {
    list-style-type: square;
  }
  .ul_disc {
    list-style-type: disc;
  }
  p,
  li,
  span {
    color: #333;
  }
`;
export default AgreementContent;
