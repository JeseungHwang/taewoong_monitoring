module.exports = function(app, fs, mysql, connection, moment)
{
    var moment = require('moment');
    var heatingFurnaceID=[
      {'name' : '1호기', 'gas' : '1237002153297', 'elect' : '1', 'temper1' : '6', 'temper2' : ''},
      {'name' : '2호기', 'gas' : '53897612946769', 'elect' : '2', 'temper1' : '7', 'temper2' : '8'},
      {'name' : '3호기', 'gas' : '59395171085649', 'elect' : '3', 'temper1' : '9', 'temper2' : '10'},
      {'name' : '4호기', 'gas' : '68191264107857', 'elect' : '4', 'temper1' : '11', 'temper2' : '12'},
      {'name' : '5호기', 'gas' : '44002008296785', 'elect' : '5', 'temper1' : '13', 'temper2' : '14'},
    ];
    var gasID = ['1237002153297','53897612946769','59395171085649','68191264107857','44002008296785'];

    
    app.get('/Gas/:heatingFurnaceNumber', function(req, res){
      connection.query('SELECT * from iiot WHERE id = ? AND name = "보정적산량" ORDER BY createdAt DESC LIMIT 121',heatingFurnaceID[req.params.heatingFurnaceNumber-1].gas, function(err,result,rows){
          if (err){
              res.send('Select query Error [Code : 0001]');
              return;
            }
            result = setHHMMformat(result);
            res.send(result)
        });
    });

    app.get('/Electricity/:idNumber', function(req, res){
      connection.query('SELECT * from iiot WHERE id = ? ORDER BY createdAt DESC LIMIT 121', heatingFurnaceID[req.params.idNumber-1].elect, function(err,result,rows){
          if (err){
              res.send('Select query Error [Code : 0001]');
              return;
            }
            result = setHHMMformat(result);
            res.send(result)
        });
    });

    app.get('/Temperature/:idNumber', function(req, res){
      connection.query('SELECT * from iiot WHERE id = ? ORDER BY createdAt DESC LIMIT 121', heatingFurnaceID[req.params.idNumber-1].temper1, function(err,result,rows){
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