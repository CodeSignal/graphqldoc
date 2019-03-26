import { Introspection } from '../../lib/interface';
import {getSchemaFromIntrospection} from '../../lib/schema-loader/introspectionParser';
import NavigationEnums from '../navigation.enum';

const introspection: Introspection = require('./empty.schema.json');
const projectPackage: any = require('./projectPackage.json');

describe('pĺugins/navigation.directive#NavigationDirectives', () => {

    const plugin = new NavigationEnums(getSchemaFromIntrospection(introspection), projectPackage, {});

    test('plugin return navigation', () => {
        const navigations = plugin.getNavigations('Query');
        expect(navigations).toBeInstanceOf(Array);
        expect(navigations).toEqual([
            {
                title: 'Enums',
                items: [
                    { text: '__DirectiveLocation', href: '/directivelocation.spec.html', isActive: false },
                    { text: '__TypeKind', href: '/typekind.spec.html', isActive: false },
                ]
            }
        ]);
    });
});
