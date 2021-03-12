import React from 'react';
import styled from 'styled-components';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const DetailsBar = ({ handleDetails }) => {
    return(
        <Container>
            <Header>
                <HeaderText>
                    Details
                </HeaderText>
                <StyledCloseIcon onClick={handleDetails}/>
            </Header>
            <ActionContainer>
                <IconContainer>
                    <Circle>
                        <PersonAddOutlinedIcon/>
                    </Circle>
                    <ActionText>
                        Add
                    </ActionText>
                </IconContainer>
                <IconContainer>
                    <Circle>
                        <PersonAddDisabledOutlinedIcon/>
                    </Circle>
                    <ActionText>
                        Delete
                    </ActionText>
                </IconContainer>
                <IconContainer>
                    <Circle>
                        <SearchOutlinedIcon/>
                    </Circle>
                    <ActionText>
                        Find 
                    </ActionText> 
                </IconContainer>
            </ActionContainer>
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
const ActionContainer = styled.div`
    display: grid;
    height: 96px;
    grid-template-columns: 1fr 1fr 1fr;
    color: white;
    border-bottom: 1px solid rgba(121, 121, 121, .6);
`
const IconContainer = styled.div`
    display:grid;
    align-items: center;
    justify-content: center;
    grid-direction: row;
    align-content: center;
`
const Circle = styled.div`
    background-color: #3e3f42;
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const ActionText = styled.div`
    text-align: center;
`
const Body = styled.div`

`


