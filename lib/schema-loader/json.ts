import { SchemaLoader, Introspection } from '../interface';
import { getSchemaFromIntrospection } from './introspectionParser';
import { resolve } from 'path';

export type TJsonSchemaLoaderOptions = {
    schemaFile: string
};

export const jsonSchemaLoader: SchemaLoader = function (options: TJsonSchemaLoaderOptions) {
    try {
        const schemaPath = resolve(options.schemaFile);
        const introspection: Introspection = require(schemaPath);

        return Promise.resolve(getSchemaFromIntrospection(introspection))
    } catch (err) {
        return Promise.reject(err);
    }
};
