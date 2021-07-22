import React from 'react';
import ReactDOM from 'react-dom';
import Launches from './launches'
import { client } from './client'
import { ApolloProvider } from '@apollo/client'

ReactDOM.render(
    <ApolloProvider client={client}>
        <React.StrictMode>
            <Launches />
        </React.StrictMode>
    </ApolloProvider>,
    document.getElementById('root')
);
