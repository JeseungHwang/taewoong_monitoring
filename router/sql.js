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

    
    app.post('/Gas/:heatingFurnaceNumber', function(req, res){
      var params = [heatingFurnaceID[req.params.heatingFurnaceNumber-1].gas, req.body.start, req.body.end];
      connection.query('SELECT * from iiot WHERE id = ? AND name = "보정적산량" AND timestamp(createdAt) BETWEEN ? AND ? ORDER BY createdAt ASC', params ,function(err,result,rows){
          if (err){
              res.send('Select query Error [Code : 1001]');
              return;
            }
            result = setDateFormat(result);
            res.send(result)
        });
    });

    app.post('/Electricity/:heatingFurnaceNumber', function(req, res){
      var params = [heatingFurnaceID[req.params.heatingFurnaceNumber-1].elect, req.body.start, req.body.end];
      connection.query('SELECT * from iiot WHERE id = ? AND timestamp(createdAt) BETWEEN ? AND ? GROUP BY UNIX_TIMESTAMP(createdAt) DIV 60 ORDER BY createdAt ASC ', params ,function(err,result,rows){
          if (err){
              res.send('Select query Error [Code : 1002]');
              return;
            }
            result = setDateFormat(result);
            res.send(result)
        });
    });

    app.post('/Temperature/:heatingFurnaceNumber', function(req, res){
      var temprKind = req.body.tKind == '1' ? heatingFurnaceID[req.params.heatingFurnaceNumber-1].temper1 : heatingFurnaceID[req.params.heatingFurnaceNumber-1].temper2;
      var params = [temprKind, req.body.start, req.body.end];
      connection.query('SELECT * from iiot WHERE id = ? AND timestamp(createdAt) BETWEEN ? AND ? GROUP BY UNIX_TIMESTAMP(createdAt) DIV 60 ORDER BY createdAt ASC', params ,function(err,result,rows){
          if (err){
              res.send('Select query Error [Code : 1003]');
              return;
            }
            result = setDateFormat(result);
            res.send(result)
        });
    });

    app.get('/Notification/:notify_type', function(req, res){
      connection.query('SELECT * from notify_log WHERE logType = ? ORDER BY createdAt DESC LIMIT 20', req.params.notify_type ,function(err,result,rows){
          if (err){
              res.send('Select query Error [Code : 1004]');
              return;
            }
            result = setDateFormat(result);
            result = changeIDtoName(result);
            res.send(result)
        });
    });

    app.post('/Notification', function(req, res){
      var params = {};
      params['logType'] = req.body.logType;
      params['dataType'] = req.body.dataType;
      params['createdAt'] = req.body.createdAt;

      if(params['dataType'] == '가스'){
        params['id'] = heatingFurnaceID[req.body.id-1].gas;
        connection.query('INSERT INTO notify_log SET ?', params, function(err, result){
          if (err){
              res.send('INSERT query Error [Code : 2001]');
              return;
            }
            res.send(result)
        });
      }
      if(params['dataType'] == '전력'){
        params['id'] = heatingFurnaceID[req.body.id-1].elect;
        connection.query('INSERT INTO notify_log SET ?', params, function(err, result){
          if (err){
              res.send('INSERT query Error [Code : 2001]');
              return;
            }
            res.send(result)
        });
      }

    });


    function setDateFormat(result){
      for (row in result){
        result[row].createdAt = moment(result[row].createdAt).format("YYYY-MM-DD HH:mm");
      }
      return result
    }

    function changeIDtoName(result){
      for (row in result){
        for(item in heatingFurnaceID){
          if(result[row].id == heatingFurnaceID[item].gas || result[row].id == heatingFurnaceID[item].elect || result[row].id == heatingFurnaceID[item].temper1 || result[row].id == heatingFurnaceID[item].temper2){
            result[row].name = heatingFurnaceID[item].name;
            break;
          }
        }
      }
      return result
    }
}