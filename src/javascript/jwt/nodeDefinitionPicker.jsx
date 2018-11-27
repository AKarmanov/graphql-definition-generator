/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { withApollo } from "react-apollo";
import { connect } from 'react-redux'
import { addUpdateDefinition, editDefinition } from './redux/actions';
import { nodeTypeInfo } from './gqlQueries';
import {batchActions} from 'redux-batched-actions';

const suggestions = [
    { label: 'jnt:news' },
    { label: 'jnt:person' },
    { label: 'jnt:blog' },
    { label: 'jnt:poll' },
    { label: 'jnt:user' }
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "auto",
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class IntegrationReactSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            single: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            [name]: value,
        });

        this.props.client.query({
            query: nodeTypeInfo,
            variables: {
                name: value.value
            }
        }).then((resp) => {
            const def = {
                definitionName: value.value,
                moduleName: "my module",
                properties: resp.data.nodeTypeProps,
                usedProperties: []
            };
            this.props.dispatch(addUpdateDefinition(def));
            this.props.dispatch(editDefinition(def));
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        inputProps={{
                            disableUnderline: true
                        }}
                        classes={classes}
                        styles={selectStyles}
                        options={suggestions}
                        components={components}
                        value={this.state.single}
                        onChange={this.handleChange }
                        placeholder="Search for a definition (i. e. jnt:news)"
                    />
                </NoSsr>
            </div>
        );
    }
}

IntegrationReactSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
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

export default withStyles(styles, { withTheme: true })(withApollo(connect(mapStateToProps, mapDispatchToProps)(IntegrationReactSelect)));