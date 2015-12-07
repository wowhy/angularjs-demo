// filters
app.filter('customerStatus', [customerStatus])

function customerStatus() {
    return function (value) {
        switch (value) {
            case 1:
                return '有效';

            case 2:
                return '无效';

            default:
                return '未知';
        }
    }
}