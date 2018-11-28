import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NodeDefinitionPicker from './nodeDefinitionPicker';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DefinitionsList from './definitionsList';
import EditDefinition from './editDefinition';
import SaveButton from './saveButton';
import { connect } from 'react-redux'
import { withApollo } from "react-apollo";
import { getDefinitions } from './gqlQueries';
import { setDefinitions } from './redux/actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class GDG extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.client.query({
            query: getDefinitions,
            variables: {
                path: "/modules/graphql-definition-generator/1.0-SNAPSHOT/templates/contents/definitions"
            }
        }).then(resp => {
            const value = JSON.parse(resp.data.jcr.nodeByPath.property.value);
            this.props.dispatch(setDefinitions(value));
        }).catch(error => console.error(error));
    }


    render() {
        const { classes } =this.props;

        return <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <NodeDefinitionPicker />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper} style={{maxHeight: "350px", minHeight: "350px", overflowY:"scroll"}}>
                        <DefinitionsList />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper} style={{maxHeight: "350px", minHeight: "350px", overflowY:"scroll"}}>
                        <EditDefinition />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <SaveButton/>
                    </Paper>
                </Grid>
            </Grid>
        </div>;
    }

}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    };
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(withApollo(GDG)));