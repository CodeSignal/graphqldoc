import { Introspection } from '../../lib/interface';
import {getSchemaFromIntrospection} from '../../lib/schema-loader/introspectionParser';
import NavigationInputs from '../navigation.input';

const introspection: Introspection = require('./empty.schema.json');
const projectPackage: any = require('./projectPackage.json');

describe('pĺugins/navigation.directive#NavigationDirectives', () => {

    const plugin = new NavigationInputs(getSchemaFromIntrospection(introspection), projectPackage, {});

    test('plugin return navigation', () => {
        const navigations = plugin.getNavigations('Query');
        expect(navigations).toBeInstanceOf(Array);
        expect(navigations).toEqual([
            {
                title: 'Input Objects',
                items: [
                    { text: 'AddCommentInput', href: '/addcommentinput.doc.html', isActive: false },
                ]
            }
        ]);
    });
});
