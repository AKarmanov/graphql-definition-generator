import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ApolloProvider} from "react-apollo";
import {client} from "@jahia/apollo-dx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DxContext from '../DxContext';
import GDG from './GDG';
import {Provider} from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { gdg } from './redux/reducer';
import {batchDispatchMiddleware} from 'redux-batched-actions';

const store = createStore(gdg);

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    }
});


function App(props) {
    const { classes, dxContext } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        GraphQL Definition Generator
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={ classes.divider } />
            <Provider store={ store }>
                <ApolloProvider client={client({contextPath: dxContext.context})}>
                    <DxContext.Provider value={dxContext}>
                            <GDG dxContext={dxContext}/>
                    </DxContext.Provider>
                </ApolloProvider>
            </Provider>
        </div>
    );
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);