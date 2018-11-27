import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {batchActions} from "redux-batched-actions";
import connect from "react-redux/es/connect/connect";
import Checkbox from '@material-ui/core/Checkbox';
import { editDefinition } from './redux/actions';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
    },
});

const  EditDefinition = ({ dispatch, editedDefinition, classes}) => {

    function addRemoveProp(editedDefinition, prop) {
        const propIndex = editedDefinition.usedProperties.findIndex(p => p.name === prop.name);
        //Remove prop
        if (propIndex !== -1) {
            dispatch(editDefinition({
                ...editedDefinition,
                queryName: editedDefinition.definitionName.split(":")[1],
                usedProperties: editedDefinition.usedProperties.filter((p, i) => i !== propIndex)
            }))
        }
        //Add property
        else {
            dispatch(editDefinition({
                ...editedDefinition,
                queryName: editedDefinition.definitionName.split(":")[1],
                usedProperties: editedDefinition.usedProperties.concat([{
                    name: prop.name,
                    userDefinedName: null
                }])
            }));
        }
    }

    return <div className={classes.root}>
            <List>
                { editedDefinition !== null && editedDefinition.properties.map(prop => {
                    return <ListItem key={prop.name}
                              role={undefined}
                              dense
                              button>
                        <ListItemText primary={`${prop.name}`} />
                        <ListItemSecondaryAction onClick={ () => addRemoveProp(editedDefinition, prop)}>
                            <Checkbox
                                checked={editedDefinition.usedProperties.findIndex(usedProp => usedProp.name === prop.name) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                })}
            </List>
        </div>
};

EditDefinition.propTypes = {
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
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditDefinition));