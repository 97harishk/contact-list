const express = require('express');
const path = require('path');
const port = 8080;
const db = require('./config/mongoose');
const app = express();
const Contact = require('./models/contact');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));
app.use(express.urlencoded());
const details = [
    {  
        "1":{  
           "id":"1",
           "order_no":"CR235134",
           "name":"Linda Johnson",
           "booking_datetime":"2019-07-02 14:29:24",
           "date":"29/10/2019",
           "amount":"1250",
           "no_of_people":"2"
        },
        "2":{  
           "id":"2",
           "order_no":"CR64838",
           "name":"Chris Martin",
           "booking_datetime":"2019-06-07 12:19:14",
           "date":"19/09/2019",
           "amount":"1550",
           "no_of_people":"5"
        },
        "3":{  
           "id":"3",
           "order_no":"AP246153",
           "name":"Vasu Khare",
           "booking_datetime":"2019-06-22 06:19:54",
           "date":"12/08/2019",
           "amount":"570",
           "no_of_people":"4"
        },
        "4":{  
           "id":"4",
           "order_no":"CR237529",
           "name":"Iqbal",
           "booking_datetime":"2019-07-02 14:29:24",
           "date":"15/10/2019",
           "amount":"990",
           "no_of_people":"3"
        },
        "5":{  
           "id":"5",
           "order_no":"AP765136",
           "name":"Narendra Gandhi",
           "booking_datetime":"2019-07-02 14:29:24",
           "date":"08/11/2019",
           "amount":"2250",
           "no_of_people":"1"
        },
        "6":{  
           "id":"6",
           "order_no":"KL144172",
           "name":"Donald Obama",
           "booking_datetime":"2019-07-02 14:29:24",
           "date":"09/12/2019",
           "amount":"9250",
           "no_of_people":"2"
        },
        "7":{  
           "id":"7",
           "order_no":"CR753934",
           "name":"Lana Del Rey",
           "booking_datetime":"2019-07-02 14:29:24",
           "date":"23/10/2019",
           "amount":"50",
           "no_of_people":"1"
        }
     }
]
const contactList = [
    {
        name: "harish",
        phone: 987654321
    },
    {
        name: "vikash",
        phone: 1234567890
    }
];
app.get('/details', function(req, res){

            return res.render('details',{
                title:"Data Arrange!",
                details: details});
        })
;
app.get('/', function(req, res){
    Contact.find({}, function(err,contacts){
        if(err){
            console.log('Could not find contcts:');
            return;
        }
        else{
            return res.render('index',{
                title:"Contact List!",
                contact_list: contacts});
        }
    })
   
});
app.get('/contact', function(req, res){
    return res.render('contact',{title:"contact !"});
});
app.get('/about', function(req, res){
    return res.render('about',{title:"about me!"});
});
app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err, newContact){
        if(err){
            console.log('error',error);
            return;
        }
        console.log('************', newContact);
        return res.redirect('/');
    })
   
    console.log(req.body);
});

app.get('/delete-contact/', function(req, res){
   
    console.log(req.query);
    let id = req.query.id;
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('There is problem while deleting this contact');
        }
        return res.redirect('back');
    })
   
});


app.listen(port,function(err){
    if(err){
        console.log('Error',err);
    }
    console.log('Express server is running on port!',port);
});