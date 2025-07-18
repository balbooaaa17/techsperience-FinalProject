<!--- #![alt text ](https://milanoschool.org/wp-content/uploads/2015/04/ODK-Logo-540x3201.jpg) -->


<!--- #[![Build Status](https://travis-ci.com/balbooaaa17/techsperience-FinalProject.svg?branch=master)] (https://travis-ci.com/balbooaaa17/techsperience-FinalProject) -->
[![Node.js CI with MongoDB](https://github.com/balbooaaa17/techsperience-FinalProject/actions/workflows/node.js.yml/badge.svg)](https://github.com/balbooaaa17/techsperience-FinalProject/actions/workflows/node.js.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# How to try it in your environment :computer:
```
2025 Tested on : 
Node 20.19.3
Mongod - 8.0.11 

```
    git clone https://github.com/balbooaaa17/techsperience-FinalProject.git
    cd techsperience-FinalProject
    type npm install on your terminal  
    Start MongoDB (ubuntu - sudo systemctl start mongod) 
    node app.js- (to start Node app) or nodemon 

####  Access the project at *http://localhost:8080*

### Docker : 
- Docker-Compose : 
```

version: '3.8'

services:
  app:
    image: astrkr/nodem:slim
   # build: .
    ports:
      - "8080:8080"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/kontratat
    depends_on:
      - mongodb

  mongodb:
    image: mongo:8.0.11
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_DATABASE=kontratat
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```





## *As of right now, it supports these (json) objs*

[![asciicast](https://asciinema.org/a/190162.png)](https://asciinema.org/a/190162)


```
{
"title" : "03",
"description" : "04",
"aktiviteti" : "Civil",
"dataInicimit" : "1994-12-12",
"publikimiShpalljes" : "2018-11-23",
"dataNenshkrimit" : "2032-12-31",
"afatetPerImplementim" : "2044-12-31",
"afatetPerImplementim1" : "2013-12-13",
"dataPermbylljes" : "2398-12-31",
"cmimiKontrates" : "1450.50",
"cmimiTotalipaguar" : "13458.85",
"emriiKontratDhenesit" : "John Doe"
}
				
				- (p.s - Random Data added by my self) -
```
<br>

## *:stuck_out_tongue_winking_eye: Use [Postman](https://www.getpostman.com/) or [Httpie](https://httpie.org/) for API*   
<br> 

<br>
In the words of Abraham Lincoln:

> Pardon me, but my favourite color is hotPink :/ ! </br>
> Wait ... He didn't actually said that ... ! xD :)

---------------------------------------

<!--- ![alt text](http://techsperience.opendatakosovo.org/images/sm_techsperience.jpg) -->

</br> </br> </br> 

MIT License

Copyright (c) 2018 - 2025 Astrit Krasniqi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
