import { Introspection } from '../../lib/interface';
import {getSchemaFromIntrospection} from '../../lib/schema-loader/introspectionParser';
import NavigationDirectives from '../navigation.directive';

const introspection: Introspection = require('./empty.schema.json');
const projectPackage: any = require('./projectPackage.json');

describe('pĺugins/navigation.directive#NavigationDirectives', () => {

    const plugin = new NavigationDirectives(getSchemaFromIntrospection(introspection), projectPackage, {});

    test('plugin return navigation', () => {
        const navigations = plugin.getNavigations('Query');
        expect(navigations).toBeInstanceOf(Array);
        expect(navigations).toEqual([
            {
                title: 'Directives',
                items: [
                    { text: 'deprecated', href: '/deprecated.doc.html', isActive: false },
                    { text: 'include', href: '/include.doc.html', isActive: false },
                    { text: 'skip', href: '/skip.doc.html', isActive: false },
                ]
            }
        ]);
    });
});
