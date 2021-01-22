git clone the repo 
install docker 
run docker-compose up

Example HTTP method:

upload csv to app 
--POST-- localhost:3000/sales/record
body:{ file: staff.csv } 
response: { 
    "route": "/upload", 
    "success": true, 
    "msg": "File Uploaded!" 
}

it must be valid time string
obtain data in single day 
--GET-- localhost:3000/sales/report?date=2020-11-05T13:15:30Z
obtain data in date range 
--GET localhost:3000/sales/report?fr=2020-11-05T13:15:30Z&to=2020-11-06T13:15:30Z
reponse:{
    "route": "/report",
    "success": true,
    "data": [
        {
            "_id": "600ac101475302001427fd22",
            "USER_NAME": "John Doe",
            "AGE": 29,
            "GENDER": "M",
            "SALE_AMOUNT": 21312,
            "LAST_PURCHASE_DATE": "2020-11-05T13:15:30.000Z"
        }
    ]
}
