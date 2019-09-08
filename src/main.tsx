import * as React from 'react'
import { connect } from 'react-redux'
// import { Dispatch } from 'redux'
import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import { ThemeProvider } from 'emotion-theming'
// import { authGetUser } from './store/accounts/actions'
import Routes from './routes'
import { ApplicationState } from './store'
import { ThemeColors } from './store/layout'
import * as themes from './styles/theme'

// Separate props from state and props from dispatch to their own interfaces.
interface PropsFromState {
    theme: ThemeColors
}

interface PropsFromDispatch {
    [key: string]: any
    // authGetUser: typeof authGetUser
}

// Any additional component props go here.
interface OwnProps {
    history: History
}

// Create an intersection type of the component props and our Redux props.
type AllProps = PropsFromState & PropsFromDispatch & OwnProps

class Main extends React.Component<AllProps> {
    componentDidMount() {
        // Retrieve user from ls
        // this.props.authGetUser()
    }

    public render() {
        const { history } = this.props
        history.listen(() => {
            window.scrollTo(0, 0)
        })


        return (
            <ConnectedRouter history={history}>
                <ThemeProvider theme={themes['dark']}>
                    <Routes />
                </ThemeProvider>
            </ConnectedRouter>
        )
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ layout }: ApplicationState) => ({
    theme: layout.theme,
    // auth: accounts
})

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     authGetUser: () => dispatch(authGetUser())
// })

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
export default connect<PropsFromState, PropsFromDispatch, OwnProps, ApplicationState>(
    mapStateToProps,
    // mapDispatchToProps
)(Main)
