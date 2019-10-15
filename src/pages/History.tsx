import React from 'react'
import {connect} from 'react-redux'
import {ApplicationState, ConnectedReduxProps} from '../store'
import Navigation from "../components/layout/Navigation";
import { Container} from "reactstrap";
import Heading from "../components/Heading";
// import MenuButton from "../components/Button";
import styled from "../utils/styled";
import HistoryCard from "../components/cards/HistoryCard";
// import OrderCard from "../components/cards/OrderCard";


type PropsFromState = {
    history: {[key: number]: {[key: number]: number}}
    config: any
}


type AllProps = PropsFromState &
    ConnectedReduxProps

class History extends React.Component<AllProps> {

    render() {
        const {history} = this.props

        return (
            <Wrapper>
                <Navigation override={-1}/>
                <Container>
                    <Heading text={'Order log'} underline={true}/>
                    {Object.keys(history).length > 0 ? (
                        <div>
                            {
                                Object.keys(history).map((key, index) => {
                                    return (
                                        <HistoryCard key={key} time={key} order={history[key]}/>
                                    )
                                })
                            }
                       </div>
                   ) : (
                       <h5>
                           You haven't ordered anything yet.
                       </h5>
                    )}

                </Container>

            </Wrapper>
        )
    }

}

const mapStateToProps = ({menus, layout}: ApplicationState) => ({
    history: menus.history,
    config: layout
})


export default connect(
    mapStateToProps
)(History)

const Wrapper = styled('div')`
    h5 {
        text-align: center;
    }
     
    .row-box {
        display: contents;
    }
    
  
`

// const TotalPrice = styled(Row)`
//     margin-top: 1rem;
// `
//
// const Buttons = styled('div')`
//
//     width: fit-content;
//     margin: 1rem auto;
//
//     button {
//         display: inline-block;
//         width: 160px;
//         margin: 0 10px;
//     }
//
// `