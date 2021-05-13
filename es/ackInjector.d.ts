export declare class ackInjector {
    $storage: any;
    $scope: any;
    constructor($scope?: any, $storage?: any);
    define(name: any, $module: any, initInjectArray: any): this;
    definePath(name: any, path: any, initInjectArray: any): this;
    LoadModule: (name: any, $module: any, $args: any, injectArray: any) => any;
    getModule(name: any, path: any): any;
    newModule(name: any, path: any, arg: any): any;
}
