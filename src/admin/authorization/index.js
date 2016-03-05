import route from './route';

export default angular.module('sample.admin.authorization', [
        'sample.core'
    ])
    .config(route)
    .name;