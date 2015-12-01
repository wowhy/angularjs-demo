app.filter('houseStatus', [houseStatus]);
app.filter('houseType', [houseType]);

function houseStatus() {
    return function (value)
    {
        switch (value) {
            case 1:
                return '有效';
            case 2:
                return '无效';
            case 3:
                return '已售';
            default:
                return '未知';              
        }
    }
}

function houseType() {
    return function (value) {
        switch (value) {
            case 1:
                return '出售';
            default:
                return '出租';
        }
    }
}