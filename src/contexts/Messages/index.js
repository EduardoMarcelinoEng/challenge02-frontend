import React, { createContext } from 'react';

const Messages = createContext([{
        title: '',
        message: '',
        type: ''
    }, () => {}
]);

export default Messages;