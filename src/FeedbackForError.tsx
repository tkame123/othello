import * as React from 'react';
import styled from 'styled-components'

interface IProps {
    handleClick: () => void;
}

const FeedbackForError: React.StatelessComponent<IProps> = (props) => {

    const {handleClick} = props;

    return (
        <Wrapper>
            <h1>エラー発生</h1>
            <p>エラー内容のFeedbackにご協力ください</p>
            <FeedbuckButton onClick={handleClick}>送信</FeedbuckButton>
        </Wrapper>
    )
};

const Wrapper = styled.div`
  padding: 20px 0px;
  text-align: center;
`;

const FeedbuckButton = styled.button`
  margin-top: 20px;  
  width: 200px;
`;


export default FeedbackForError;
