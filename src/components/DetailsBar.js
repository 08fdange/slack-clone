import React from 'react';
import styled from 'styled-components';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const DetailsBar = ({ handleDetails }) => {
    return(
        <Container>
            <Header>
                <HeaderText>
                    Details
                </HeaderText>
                <StyledCloseIcon onClick={handleDetails}/>
            </Header>
            <Body>

            </Body>
        </Container>
    )
}

export default DetailsBar;

const Container = styled.div`
    width: 260px;
    background: rgb(20 18 22);
    border-left: 1px solid rgba(121, 121, 121, .6);
`
const Header = styled.div`
    color: white;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    padding-right: 19px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(121, 121, 121, .6);
`
const HeaderText = styled.div`
    font-weight: bold;
`
const StyledCloseIcon = styled(CloseOutlinedIcon)`
    margin-left: 10px;
    padding: 6px;
    cursor: pointer;
    border-radius: 3px;
    :hover {
        background: #28292f;
    }
`
const Body = styled.div`

`

