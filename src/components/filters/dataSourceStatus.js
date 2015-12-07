app.filter('dataSourceStatus', [dataSourceStatus]);

function dataSourceStatus() {
    return function (value) {
        switch (value) {
            case 1:
                return '有效';

            default:
                return '未知';
        }
    }
}