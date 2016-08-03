
var appRoot = 'src/';

module.exports = {
  path : {
    root: appRoot,
	
	/* options and their defaults */ 
	
    /* js files to ignore
     *  ignore: [],
	 */
	
    /* future use: use TypeScript or Babel for transpiling
     * useTypeScriptForDTS: false,
	 */
	 
    /* eg. non-concated local imports in the main file as they will get removed
     * during the build process
     * importsToAdd: [],
	 */

    /* js to be transpiled, but not be concated and keeping their relative path
     * jsResources: [appRoot + 'components/'],
	 */

    // other resources that need to get copied keeping their path
    // resources: appRoot + '{**/*.css,**/*.html}',
	//

    /* imports that are only used internally. no need to d.ts export them
     * importsToIgnoreForDts: [],
	 */
     importsToIgnoreForDts: ['extend']
	 
    /* sort when concating
     * sort: true,
	 */

    /* concat js files
     * concat: true
	 */
  }
};
