import { Introspection } from '../../lib/interface';
import {getSchemaFromIntrospection} from '../../lib/schema-loader/introspectionParser';
import NavigationInterfaces from '../navigation.interface';

const introspection: Introspection = require('./empty.schema.json');
const projectPackage: any = require('./projectPackage.json');

describe('pĺugins/navigation.interface#NavigationInterfaces', () => {

    const plugin = new NavigationInterfaces(getSchemaFromIntrospection(introspection), projectPackage, {});

    test('plugin return navigation', () => {
        const navigations = plugin.getNavigations('Query');
        expect(navigations).toBeInstanceOf(Array);
        expect(navigations).toEqual([]);
    });
});
