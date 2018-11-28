import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {batchActions} from "redux-batched-actions";
import connect from "react-redux/es/connect/connect";
import { addUpdateDefinition, editDefinition } from './redux/actions';
import {withApollo} from "react-apollo";
import { storeDefinitions } from './gqlMutations';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: "100%",
        backgroundColor: theme.palette.background.paper,
    },
});

const  SaveButton = ({ dispatch, definitions, editedDefinition, classes, client}) => {

    function save() {
        dispatch(addUpdateDefinition(editedDefinition));
        const defs = definitions.map(d => {
            if (d.definitionName !== editedDefinition.definitionName) {
                return d;
            }
            return editedDefinition;
        });

        client.mutate({
            mutation: storeDefinitions,
            variables: {
                definitionsPath: "/modules/graphql-definition-generator/1.0-SNAPSHOT/templates/contents/definitions",
                definitions: JSON.stringify(defs)
            }
        }).then(resp => console.log("SAVED", resp)).catch(error => console.log("FAILED SAVE", error));
    }

    return <div className={classes.root}>
            <Button onClick={save}>Save</Button>
        </div>
};

SaveButton.propTypes = {
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
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withApollo(SaveButton)));