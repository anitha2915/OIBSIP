const Menu=require('../../models/menu')
function homeController(){
    return{
       async index(req,res){
            const pizzas=await Menu.find()
            console.log(JSON.stringify(pizzas, null, 2));
            return res.render('home',{pizzas:pizzas})
        
           
        }  
    }
}

module.exports=homeController 

// const Menu = require('../../models/menu');

// function homeController() {
//     return {
//         async index(req, res) {
//             try {
//                 const pizzas = await Menu.find();
//                 console.log(JSON.stringify(pizzas, null, 2));  // Log full details
//                 return res.render('home', { pizzas });
//             } catch (err) {
//                 console.error('Error fetching pizzas:', err);
//                 res.status(500).send('Internal Server Error');
//             }
//         }
//     }
// }

// module.exports = homeController;
