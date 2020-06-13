var express = require('express');
var router = express.Router();
var fs = require('fs');
var pdf = require('html-pdf');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile', function(req, res) {
  var data = {
    nama: 'Dwiko',
    umur: '25',
    jenisKelamin: 'Ganda Campuran',
    alamat: {
      jalan: 'Sindanglaya',
      nomorRumah: '131',
      rt: '3',
      rw: '1'
    },
    pendidikan: 'SMA'
  }
  var arr = ['Thresh', 'Blitzcrank', 'Rakan', 'Lux', 'Ezreal']
  res.render('profile', {arr});
});

router.get('/cimeng', function(req, res) {
  var destination = path.join(__dirname, '../views/gabon.html');
  var html = fs.readFileSync(destination, 'utf8')
  .replace('~name~', 'Gabon')
  .replace('~gender~', 'Ganda Campuran')
  .replace('~city~', 'Bandung')
  .replace('~job~', 'Mulung')
  var name = Date.now() + '.pdf';
  pdf.create(html, {format: 'A5'}).toFile('./' + name, function(err, result) {
    if (err) {
      res.send({error: err})
    }else{
      console.log('File '+name+' created!');
      setTimeout(() => {
        fs.unlink(path.join(__dirname, '../' + name), () => {
          console.log('File '+name+' deleted!');
          res.send('done')
        })
      }, 5000)
    }
  });
})

module.exports = router;
