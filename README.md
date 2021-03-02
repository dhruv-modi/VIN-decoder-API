# VIN DECODER API


* github link: https://github.com/dhruv-modi/VIN-decoder-API

* heroku link: https://nhtsa-backend-api.herokuapp.com/

## Endpoints exposed:

* /getModels :- returns list of tesla models between 2015 amnd 2020 (GET)

* /getVin :- decodes single VIN, takes vin and year as parameters (GET)

* /getVin/detailed :- decodes single VIN, returns detailed VIN, takes vin and year as parameters (GET)

* /getVin/bulk :- decodes bulk VIN, takes JSON body of {"DATA":"5UXWX7C5*BA,2011; 5YJSA3DS*EF"}, format is {VIN1,year1;VIN2,year2} (GET)

* /getParts :-  returns parts used in the VINS, takes JSON body of {"DATA":"5UXWX7C5*BA,2011; 5YJSA3DS*EF"}, format is {VIN1,year1;VIN2,year2} (GET)
