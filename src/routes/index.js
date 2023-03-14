const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const Task = require('../models/Task');
const PrivateTask = require('../models/PrivateTask');

const jwt = require('jsonwebtoken');

router.get('/index', (req, res) => {
    console.log("index?")
    res.send('hello word from index')
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(email," and ",password)
    const newUser = new User({email, password});
    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('The email doen\' exists');
    if (user.password !== password) return res.status(401).send('Wrong Password');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});

router.get('/tasks', (req, res) => {

    const allTask = Task.find().sort({ fecha: 1 }).then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});

router.post('/createTask', async (req, res) => {
    const {empresa,fecha_entrega,fecha,
    supervisor,material,tipo_bolsa,
    cogedera,color_tela,medidas,
    marcacion,color_tintas,
    cantidad,name, description, date} = req.body;
    const newTask = new Task({ empresa,fecha_entrega,fecha,
        supervisor,material,tipo_bolsa,
        cogedera,color_tela,medidas,
        marcacion,color_tintas,
        cantidad,name, description, date});
    await newTask.save();
    res.status(200).json(newTask);

});

router.delete('/deleteTaks',(req, res) => {
    const deleteTask = Task.deleteMany().then((result) => {
        res.status(201).json(deleteTask);
    }).catch((err) => {
        console.log(err)
    });
    
   
});

router.post('/deleteTaksByid', (req, res) => {
    const { _id } = req.body;

    // delete a specific document
    Task.deleteOne({ _id: _id }, (err, result) => {
        if (err) throw err;
        console.log(`${result.deletedCount} document(s) deleted`);
        res.status(201).json(`${result.deletedCount} document(s) deleted`);
    });


});


router.put('/updateTask',verifyToken,(req,res) => {

    const { _id } = req.body;
    Task.updateOne(
        { _id: _id },
        { $set: { cantidad: 1502} },
        (err, result) => {
          if (err) throw err;
          console.log(`${result.modifiedCount} registro(s) actualizado(s)`);
          res.status(201).json(`${result.modifiedCount} registro(s) actualizado(s)`);
        }
      );
});

router.get('/private-tasks', verifyToken, (req, res) => {
    
    PrivateTask.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    });
});

router.post('/createPrivateTask',verifyToken, async (req,res) =>{
    
    const {name, description, date} = req.body;
    
    const newPrivateTask = new PrivateTask({name, description, date});

    await newPrivateTask.save();
    res.status(200).json(newPrivateTask);

});

router.delete('/deleteAllPrivateTask', verifyToken, (req, res) =>{
    const deletePrivateTask = PrivateTask.deleteMany().then((result) => {
        res.status(201).json(deletePrivateTask);
    }).catch((err) => {
        console.log(err)
    });
});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;