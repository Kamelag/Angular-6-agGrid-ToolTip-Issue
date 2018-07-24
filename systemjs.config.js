(function (global) {
    System.config({
            transpiler: 'ts',
            typescriptOptions: {
                "target": "es5",
                "module": "commonjs",
                "moduleResolution": "node",
                "sourceMap": true,
                "emitDecoratorMetadata": true,
                "experimentalDecorators": true,
                "removeComments": false,
                "noImplicitAny": true
            },
            meta: {
                'typescript': {
                    "exports": "ts"
                }
            },
            paths: {
                // paths serve as alias
                'npm:': 'https://unpkg.com/'
            },
            map: {
                'app': 'app',
                // angular bundles
                '@angular/core': 'npm:@angular/core@2.4.8/bundles/core.umd.js',
                '@angular/common': 'npm:@angular/common@2.4.8/bundles/common.umd.js',
                '@angular/compiler': 'npm:@angular/compiler@2.4.8/bundles/compiler.umd.js',
                '@angular/platform-browser': 'npm:@angular/platform-browser@2.4.8/bundles/platform-browser.umd.js',
                '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@2.4.8/bundles/platform-browser-dynamic.umd.js',
                '@angular/router': 'npm:@angular/router@2.4.8/bundles/router.umd.js',
                '@angular/forms': 'npm:@angular/forms@2.4.8/bundles/forms.umd.js',
                // other libraries
                'rxjs':                      'npm:rxjs@5.0.0',
                'ts':                        'npm:plugin-typescript@4.0.10/lib/plugin.js',
                'typescript':                'npm:typescript@2.1.1/lib/typescript.js',
                // ag libraries
                'ag-grid-angular': 'npm:ag-grid-angular',
                'ag-grid': 'npm:ag-grid',
                'ag-grid-enterprise': 'npm:ag-grid-enterprise'
            },
            packages: {
                app: {
                    main: './boot.ts',
                    defaultExtension: 'ts'
                },
                'ag-grid': {
                    main: 'main.js'
                }
            }
        }
    );

    if (!global.noBootstrap) {
        bootstrap();
    }

    // Bootstrap the `AppModule`(skip the `app/main.ts` that normally does this)
    function bootstrap() {

        // Stub out `app/main.ts` so System.import('app') doesn't fail if called in the index.html
        System.set(System.normalizeSync('app/boot.ts'), System.newModule({}));

        // bootstrap and launch the app (equivalent to standard main.ts)
        Promise.all([
            System.import('@angular/platform-browser-dynamic'),
            System.import('app/app.module')
        ])
            .then(function (imports) {
                var platform = imports[0];
                var app = imports[1];
                platform.platformBrowserDynamic().bootstrapModule(app.AppModule);
            })
            .catch(function (err) {
                console.error(err);
            });
    }
})(this);