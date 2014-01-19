/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var db;
var map;
var countryCode;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //will create database Dummy_DB or open it
        db = window.openDatabase("Dummy_DB", "1.0", "Just a Dummy DB", 200000);
        db.transaction(populateDB, errorCB, successCB);
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/
        console.log('Received Event: ' + id);
    },
    showSelectedCounty:function(cCode){
    	countryCode = cCode;
    	console.log('...findCountry..starts');
    	db.transaction(queryCountry,errorCB);
    }
};
//create table and insert some record
function populateDB(tx) {
	console.log("Entered in populateDB method");
    tx.executeSql('CREATE TABLE IF NOT EXISTS SoccerPlayer (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS countries (id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT NOT NULL,population TEXT NOT NULL)');
    //tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Alexandre Pato", "AC Milan")');
    //tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Van Persie", "Arsenal")');
    //tx.executeSql('INSERT INTO countries(code,population) VALUES ("IN", "1000")');
	console.log("Exiting populateDB method");
}

//function will be called when an error occurred
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

//function will be called when process succeed
function successCB() {
    console.log("success on sql query.. rendering data!");
    db.transaction(queryDB,errorCB);
}

//select all from SoccerPlayer
function queryDB(tx){
	console.log('querying db for countries');
    //tx.executeSql('SELECT * FROM SoccerPlayer',[],querySuccess,errorCB);
	//tx.executeSql('SELECT * FROM countries',[],queryListCountriesSuccess,errorCB);
}

function querySuccess(tx,result){
	//console.log(result.rows.length);
    var resultLen = result.rows.length;
	console.log("populating players starts.."+resultLen);
    $('#SoccerPlayerList').empty();
    
    for(var i=0;i<resultLen;i++){
    	 var row = result.rows.item(i);
         console.log("Iterating Rowss.."+row);
         $('#SoccerPlayerList').append('<li><a href="#"><h3 class="ui-li-heading">'+row['Name']+'</h3><p class="ui-li-desc">Club '+row['Club']+'</p></a></li>');
    
    }
    console.log("populating players ends");
    //$('#SoccerPlayerList').listview();
}

function queryListCountriesSuccess(tx,result){
	 var resultLen = result.rows.length;
	console.log("listing countries starts.."+resultLen);
    $("#countryCode").text('');
    $("#population").text('');
	 for(var i=0;i<resultLen;i++){
    	 var row = result.rows.item(i);
         console.log("Iterating Rowss.."+row['code']+'='+row['population']);
         $("#countryCode").text('COUNTRY:'+row['code']);
         $("#population").text('POPULATION:'+row['population']);
	 }
	 console.log("listing countries ends..");
}

function queryCountry(tx){
	tx.executeSql('SELECT * FROM countries where code=?',[countryCode],queryListCountriesSuccess,errorCB);
}