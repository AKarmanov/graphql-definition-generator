const initialState = {
    definitions: [],
    editedDefinition: null
};

export const gdg = (state = initialState, action) => {
    switch (action.type) {
        case 'GDG_SET_DEFINITIONS': return {
            ...state,
            definitions: action.definitions
        };
        case 'GDG_ADD_UPDATE_DEFINITION':
            const index = state.definitions.findIndex((def) => {
                return def.definitionName === action.definition.definitionName;
            });

            if (index !== -1) {
                return {
                    ...state,
                    definitions: state.definitions.map((def, i) => {
                        if (index !== i) return def;
                        return action.definition;
                    })
                }
            }

            return {
                ...state,
                definitions: state.definitions.concat(action.definition)
            };
        case 'GDG_REMOVE_DEFINITION': return {
            ...state,
            definitions: state.definitions.filter((def) => {
                return def.definitionName !== action.definitionName
            })
        };
        case 'GDG_EDIT_DEFINITION': return {
            ...state,
            editedDefinition: action.definition
        };
        default: return state;
    }
};
