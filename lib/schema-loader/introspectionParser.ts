import { Schema, Introspection, RawIntrospection, WrappedIntrospection } from '../interface';

function isRawIntrospection(arg: any): arg is RawIntrospection {
    return arg.__schema !== undefined;
}

function isWrappedIntrospection(arg: any): arg is WrappedIntrospection {
    return arg.data !== undefined;
}

export function getSchemaFromIntrospection(introspection: Introspection): Schema {
    if (isRawIntrospection(introspection)) {
        return introspection.__schema;
    } else if (isWrappedIntrospection(introspection)) {
        return introspection.data.__schema;
    } else {
        throw new Error('Could not parse schema');
    }
}
