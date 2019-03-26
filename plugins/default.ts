import { Plugin } from '../lib/utility';
import {
    Schema,
    PluginInterface,
    DocumentSectionInterface,
    NavigationSectionInterface,
} from '../lib/interface';
import NavigationSchema from './navigation.schema';
import NavigationScalar from './navigation.scalar';
import NavigationEnum from './navigation.enum';
import NavigationInterfaces from './navigation.interface';
import NavigationUnion from './navigation.union';
import NavigationObject from './navigation.object';
import NavigationIput from './navigation.input';
import NavigationDirective from './navigation.directive';
import DocumentSchema from './document.schema';
import RequireByPlugin from './document.require-by';

export default class NavigationDirectives extends Plugin implements PluginInterface {

    plugins: PluginInterface[];

    constructor(document: Schema, graphqldocPackage: any, projectPackage: any) {
        super(document, graphqldocPackage, projectPackage);
        this.plugins = [
            new NavigationSchema(document, graphqldocPackage, projectPackage),
            new NavigationScalar(document, graphqldocPackage, projectPackage),
            new NavigationEnum(document, graphqldocPackage, projectPackage),
            new NavigationInterfaces(document, graphqldocPackage, projectPackage),
            new NavigationUnion(document, graphqldocPackage, projectPackage),
            new NavigationObject(document, graphqldocPackage, projectPackage),
            new NavigationIput(document, graphqldocPackage, projectPackage),
            new NavigationDirective(document, graphqldocPackage, projectPackage),
            new DocumentSchema(document, graphqldocPackage, projectPackage),
            new RequireByPlugin(document, graphqldocPackage, projectPackage),
        ];
    }


    getNavigations(buildForType?: string): Promise<NavigationSectionInterface[]> {
        return Plugin.collectNavigations(this.plugins, buildForType);
    };

    getDocuments(buildForType?: string): Promise<DocumentSectionInterface[]> {
        return Plugin.collectDocuments(this.plugins, buildForType);
    };

    getHeaders(buildForType?: string): Promise<string[]> {
        return Plugin.collectHeaders(this.plugins, buildForType);
    }

    getAssets(): Promise<string[]> {
        return Plugin.collectAssets(this.plugins);
    }
}
