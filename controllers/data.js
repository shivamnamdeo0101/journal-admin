const path = require('path');
const fs = require('fs');

exports.getData = async (req, res, next) => {
    try {
        const name = req.params.name;
        let filePath;
        if(name === "action"){
            filePath = path.join(__dirname, '..', 'data', 'action.json');
        }
        if(name === "tradetype"){
            filePath = path.join(__dirname, '..', 'data', 'tradetype.json');
        } 
        if(name === "session"){
            filePath = path.join(__dirname, '..', 'data', 'session.json');
        }  
        if(name === "charttimeframe"){
            filePath = path.join(__dirname, '..', 'data', 'charttimeframe.json');
        } 
        if(name === "emotions"){
            filePath = path.join(__dirname, '..', 'data', 'emotions.json');
        }   
        if(name === "segment"){
            filePath = path.join(__dirname, '..', 'data', 'segment.json');
        }   
         
       fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                const jsonData = JSON.parse(data);
                const length = jsonData.length;
                res.status(200).json({ length: length,data: jsonData, });
            }
        });

    } catch (err) {
        next(err);
    }
};
