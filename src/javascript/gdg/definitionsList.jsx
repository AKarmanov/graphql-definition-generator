import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {batchActions} from "redux-batched-actions";
import connect from "react-redux/es/connect/connect";
import { editDefinition } from './redux/actions';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
    },
});

const  DefinitionsList = ({ dispatch, definitions, editedDefinition, classes}) => {

    return <div className={classes.root}>
            <List>
                { definitions.map(def => {
                    return <ListItem key={def.definitionName}
                              role={undefined}
                              dense
                              button
                              selected={true}>
                        <ListItemText primary={`${def.definitionName}`} />
                        <ListItemSecondaryAction onClick={ () => dispatch(editDefinition(JSON.parse(JSON.stringify(def))))}>
                            <IconButton aria-label="Comments">
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
        </div>
};

DefinitionsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        dispatchBatch: actions => dispatch(batchActions(actions))
    };
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DefinitionsList));