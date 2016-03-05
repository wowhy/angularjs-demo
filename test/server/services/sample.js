module.exports = function (router) {
    var serviceApi = '/hfc/sample/';


// get
    router.get(serviceApi + 'get.action', function (req, res) {
        if (req.query.id) {
            res.status(200)
                .send({
                    id: req.query.id,
                    code: 'test',
                    name: '测试'
                });
        } else {
            res.status(400)
                .send({
                    code: 1,
                    message: '参数错误'
                });
        }
    });

// search
    router.post(serviceApi + 'search.action', function (req, res) {
        if (req.body.pageIndex &&
            req.body.pageSize &&
            req.body.sorter &&
            req.body.filter) {
            res.status(200)
                .send({
                    total: 100,
                    data: [{
                        id: 1,
                        code: 'test',
                        name: '测试'
                    }]
                });
        } else {
            res.status(400)
                .send({
                    code: 1,
                    message: '参数错误'
                });
        }
    });

// list
    router.post(serviceApi + 'list.action', function (req, res) {
        if (req.body.sorter &&
            req.body.filter) {
            res.status(200)
                .send([{
                    id: 1,
                    code: 'test',
                    name: '测试'
                }]);
        } else {
            res.status(400)
                .send({
                    code: 1,
                    message: '参数错误'
                });
        }
    });

// add
    router.post(serviceApi + 'add.action', function (req, res, next) {
        var result = {};
        for (var p in req.body) {
            result[p] = req.body[p];
        }

        result.id = 1;
        result.createdOn = new Date();

        res.status(200)
            .send(result);
    });

// edit
    router.put(serviceApi + 'edit.action', function (req, res, next) {
        if (req.body.id) {
            var result = {};
            for (var p in req.body) {
                result[p] = req.body[p];
            }

            result.modifiedOn = new Date();

            res.status(200)
                .send(result);
        } else {
            res.status(400)
                .send({
                    code: 1,
                    message: '参数错误'
                });
        }
    });

// remove
    router.delete(serviceApi + 'remove.action', function (req, res, next) {
        if (req.query.id && req.query.version) {
            res.status(204).send();
        } else {
            res.status(400)
                .send({
                    success: false,
                    message: '参数错误'
                });
        }
    });
};