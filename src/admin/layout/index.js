import * as index from 'ngtemplate?relativeTo=/src/admin/&prefix=admin/!../views/layout/index.html';
import * as header from 'ngtemplate?relativeTo=/src/admin/&prefix=admin/!../views/layout/header.html';
import * as pageHead from 'ngtemplate?relativeTo=/src/admin/&prefix=admin/!../views/layout/page-head.html';
import * as footer from 'ngtemplate?relativeTo=/src/admin/&prefix=admin/!../views/layout/footer.html';
import * as sidebar from 'ngtemplate?relativeTo=/src/admin/&prefix=admin/!../views/layout/sidebar.html';

import './layout.css';

export default angular.module('sample.admin.layout', []).name;