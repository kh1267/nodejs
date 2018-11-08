var express = require('express');
var bodyParser = require('body-parser');

//Data
var items = [{
    name: '우유',
    price: 2000
}, {
    name: '홍차',
    price: '5000'

}, {
    name: '커피',
    price: '5000'
    }];

//웹 서버를 생성합니다.
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//라우트합니다.
app.get('/products', function (req, res) {
    res.send(items);
})
app.get('/products/:id', function (req, res) {
    var id = Number(req.params.id);
    if (isNaN(id)) {
        res.send({error: '숫자를입력하세요'})
    } else if (items[id]) {
        res.send(items[id])
    } else {
        res.send({error : '존재하지않는데이터'})
    }
})

app.post('/products', function (req, res) {
    //변수를 선언합니다.
    var name = req.body.name;
    var price = req.body.price;
    var item = {
        name: name,
        price: price
    };
    //데이터를 추가합니다.
    items.push(item)
    //응답합니다.
    res.send({
        message: '데이터를 추가했습니다.',
        data: item
    })
})
app.put('/products/:id', function (req, res) {
    var id = Number(req.params.id);
    var name = req.body.name;
    var price = req.body.price;

    if (items[id]) {
        if (name) { items[id].name = name; }
        if (price) { items[id].price = price };
        res.send({
            message: '데이터를 수정했습니다.',
            data: items[id]
        })
    } else {
        res.send({
            error: '존재하지 않는 데이터입니다.'
        });
    };
});
app.del('/products/:id', function (req, res) {
    var id = Number(req.params.id);

    if (isNaN(id)) {
        res.send({
            error: '숫자를 입력하세요.'
        })
    } else if (items[id]) {
        items.splice(id, 1),
            res.send({ messege: '데이터를 삭제했습니다.' })
    } else {
        res.send({
            error: '존재하지 않는데이터입니다.'
        })
    }
});

//웹 서버를 실행합니다.
app.listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273')
});

