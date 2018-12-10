module.exports = function(app, fs, mysql, connection, moment)
{
    var moment = require('moment');
    var gasID = ['1237002153297','53897612946769','59395171085649','68191264107857','44002008296785'];
    
    app.get('/Gas/:heatingFurnaceNumber', function(req, res){
      connection.query('SELECT * from iiot WHERE id = ? AND name = "보정적산량" ORDER BY createdAt DESC LIMIT 121',gasID[req.params.heatingFurnaceNumber-1], function(err,result,rows){
          if (err){
              res.send('Select query Error [Code : 0001]');
              return;
            }
            result = setHHMMformat(result);
            res.send(result)
        });
    });

    app.get('/Electricity/:idNumber', function(req, res){
      connection.query('SELECT * from iiot WHERE id = ? ORDER BY createdAt DESC LIMIT 121', req.params.idNumber, function(err,result,rows){
          if (err){
              res.send('Select query Error [Code : 0001]');
              return;
            }
            result = setHHMMformat(result);
            res.send(result)
        });
    });

    app.get('/Temperature/:idNumber1', function(req, res){
      connection.query('SELECT * from iiot WHERE id = ? ORDER BY createdAt DESC LIMIT 121', req.params.idNumber1, function(err,result,rows){
          if (err){
              res.send('Select query Error [Code : 0001]');
              return;
            }
            result = setHHMMformat(result);
            res.send(result)
        });
    });

    function setHHMMformat(result){
      for (row in result){
        result[row].createdAt = moment(result[row].createdAt).format("HH:mm");
      }
      return result
    }
}