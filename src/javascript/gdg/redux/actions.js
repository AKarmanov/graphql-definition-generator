export const setDefinitions = definitions => {
    return {
        type: 'GDG_SET_DEFINITIONS',
        definitions: definitions
    };
};

export const addUpdateDefinition = definition => {
    return {
        type: 'GDG_ADD_UPDATE_DEFINITION',
        definition: definition
    };
};

export const removeDefinition = definitionName => {
    return {
        type: 'GDG_REMOVE_DEFINITION',
        definitionName: definitionName
    };
};

export const editDefinition = definition => {
    return {
        type: 'GDG_EDIT_DEFINITION',
        definition: definition
    };
};
