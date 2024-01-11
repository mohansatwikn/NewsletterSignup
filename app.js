const express=require('express');
const bodyParser=require('body-parser');
const https=require("https");
const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/signup',(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post('/signup',(req,res)=>{
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const  gmail=req.body.gname;
    const data={
        members:[
            {
                email_address:gmail,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us13.api.mailchimp.com/3.0/lists/21104404c3";
    const options={
        method:"POST",
        auth:"MohanSatwik:73c50a63d9cc2d2a5971861b65c7c64c-us13"
    }
    const request=https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",(data)=>{
            const mat=JSON.parse(data);
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure",(req,res)=>{
    res.redirect("/signup");
})

app.listen(process.env.PORT || port,()=>{
    console.log(`server listening at port ${port}`);
});

//API-KEY 73c50a63d9cc2d2a5971861b65c7c64c-us13
//list id 21104404c3


