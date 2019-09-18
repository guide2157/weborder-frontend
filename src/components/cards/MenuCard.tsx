import React from 'react'
import styled from "../../utils/styled";
import {Link} from "react-router-dom";
import {Col} from "reactstrap";
import {ApplicationState, ConnectedReduxProps} from "../../store";
import {Dispatch} from "redux";
import {addWishList, removeWishList} from "../../store/menus/actions";
import {connect} from "react-redux";


type Props = {
    menu : {
        category_name?: string
        image: string
        id: number
        name: string
        price: number
        tags: string[]
    }
}

type PropsFromState = {
    wishList: number[]
    config: any
}

type PropsFromDispatch = {
    addToWishList: typeof addWishList
    removeFromWishList: typeof removeWishList
}

type SrcProp = {
    src: string
}

type State = {
    wishList: boolean
}

type AllProps = Props & PropsFromState & PropsFromDispatch & ConnectedReduxProps

class MenuCard extends React.Component<AllProps, State> {

    state = {
        wishList: this.props.wishList.find(menu => {
            return menu === this.props.menu.id
        }) !== undefined
    }

    toggleWishList = (e : any) => {
        e.preventDefault()
        const {menu} = this.props
        if (this.state.wishList) {
            this.props.removeFromWishList(menu.id)
        } else {
            this.props.addToWishList(menu.id)
        }

        this.setState( {
            wishList : !this.state.wishList
        })
    }

    render() {
        const {menu} = this.props
        const {image, id, name, price, tags} = menu
        return (
            <Wrapper sm={3} md={3}>
                <CardLink>
                    <Link to={`/menus/${id}`}>
                        <DishCard src={image}>
                            {tags.length > 0 && (
                                <CardInfoTop>
                                <h5>
                                    {tags[0]}
                                </h5>
                                    <span onClick={e => this.toggleWishList(e)}>
                                        Wishlist
                                    </span>
                                </CardInfoTop>
                            )}
                            <CardInfoBottom>
                                <h5>
                                    {name}
                                </h5>
                                <span>
                                {price}
                            </span>
                            </CardInfoBottom>
                        </DishCard>
                    </Link>
                </CardLink>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({ menus, layout}: ApplicationState) => ({
    wishList: menus.wishList,
    config: layout,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addToWishList: (payload: any) => dispatch(addWishList(payload)),
    removeFromWishList: (payload: any) => dispatch(removeWishList(payload))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuCard)

const Wrapper = styled(Col)`
    padding: 0;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
`

const CardLink = styled('span')`
  &:focus,
  &:hover {
    text-decoration: none;
    .card-title {
      color: ${props => props.theme.colors.white};
    }
  }
`

const DishCard = styled('div')`
    background-image: linear-gradient(rgb(0, 0, 0, 0.3), rgb(0, 0, 0, 0.3)),
    url(${(props: SrcProp) => props.src});
  background-size: cover;
  background-position: center;
  height: 250px;
  border-radius: 10px;
  font-size: 0.75rem;
  position: relative;
`

const CardInfoBottom = styled('div')`
  position: absolute;
  left: 15px;
  bottom: 20px;
  width: 80%;
  h5 {
    color: ${props => props.theme.colors.white};
    margin-bottom: 0;
    font-size: 1rem;
    display: inline-block;
    width: 72%;
  }
  
  span {
        float: right;
        color: ${props => props.theme.colors.white};
        font-size: 0.9rem;
    }
  
`

const CardInfoTop = styled('div')`
    position: absolute;
    left: 15px;
    top: 20px;
    width: 80%;
    h5 {
        color: ${props => props.theme.colors.white};
        font-size: 1rem;
        display: inline-block;
    }
    span {
        float: right;
        color: ${props => props.theme.colors.white};
        margin-bottom: 0;
        font-size: 0.8rem;
    }
`