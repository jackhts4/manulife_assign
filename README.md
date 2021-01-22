How to use <br/>
git clone the repo <br/>
install docker <br/>
run docker-compose up<br/>

Port 3000 will be used for the app <br/>
Port 27017 will be used for mongo <br/>

Example HTTP method:<br/>

upload csv to app <br/>
--POST-- localhost:3000/sales/record<br/>
body:{ file: staff.csv } <br/>
response: { <br/>
    "route": "/upload", <br/>
    "success": true, <br/>
    "msg": "File Uploaded!" <br/>
}<br/>

it must be valid time string<br/>
obtain data in single day <br/>
--GET-- localhost:3000/sales/report?date=2020-11-05T13:15:30Z<br/>
obtain data in date range <br/>
--GET localhost:3000/sales/report?fr=2020-11-05T13:15:30Z&to=2020-11-06T13:15:30Z<br/>
reponse:{<br/>
    "route": "/report",<br/>
    "success": true,<br/>
    "data": [<br/>
        {<br/>
            "_id": "600ac101475302001427fd22"<br/>,
            "USER_NAME": "John Doe",<br/>
            "AGE": 29,<br/>
            "GENDER": "M",<br/>
            "SALE_AMOUNT": 21312,<br/>
            "LAST_PURCHASE_DATE": "2020-11-05T13:15:30.000Z"<br/>
        }<br/>
    ]<br/>
}<br/>
