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
	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
		// will create database Dummy_DB or open it
		db = window.openDatabase("Dummy_DB", "1.0", "Just a Dummy DB", 200000);
		db.transaction(populateDB, errorCB, successCB);
	},

	// Update DOM on a Received Event
	receivedEvent : function(id) {
		/*
		 * var parentElement = document.getElementById(id); var listeningElement =
		 * parentElement.querySelector('.listening'); var receivedElement =
		 * parentElement.querySelector('.received');
		 * 
		 * listeningElement.setAttribute('style', 'display:none;');
		 * receivedElement.setAttribute('style', 'display:block;');
		 */
		console.log('Received Event: ' + id);
	},
	showSelectedCounty : function(cCode) {
		countryCode = cCode;
		console.log('...findCountry..starts');
		db.transaction(queryCountry, errorCB);
	}
};
// create table and insert some record
function populateDB(tx) {
	console.log("Entered in populateDB method");
	 // tx.executeSql('CREATE TABLE IF NOT EXISTS countries (id INTEGER PRIMARY KEY AUTOINCREMENT, code TEXT NOT NULL,population TEXT NOT NULL,country TEXT NOT NULL)');
	 // tx.executeSql('INSERT INTO countries(code,population,country) VALUES ("IN","1,239,200,000","INDIA")'); 
	 // tx.executeSql('INSERT INTO countries(code,population,country) VALUES ("AU","23,352,213","AUSTRALIA")'); 
	 // tx.executeSql('INSERT INTO countries(code,population,country) VALUES ("US","317,500,000","UNITED STATES OF AMERICA")');
	 // tx.executeSql('INSERT INTO countries(code,population,country) VALUES ("CN","1,362,290,000","CHINA")'); 
	 // tx.executeSql('INSERT INTO countries(code,population,country) VALUES ("RU","143,600,000","RUSSIAN FEDERATION")');
	 // tx.executeSql('INSERT INTO countries(code,population,country) VALUES ("UK","63,705,000","UNITED KINGDOM")'); 
	 // tx.executeSql('INSERT INTO countries(code,population,country) VALUES ("CA","35,295,770","CANADA")'); 
	 // tx.executeSql('INSERT INTO countries(code,population,country) VALUES ("GL", "56,370","GREENLAND")');
	console.log("Exiting populateDB method");
}

// function will be called when an error occurred
function errorCB(err) {
	alert("Error processing SQL: " + err.code);
}

// function will be called when process succeed
function successCB() {
	console.log("success on sql query.. rendering data!");
	db.transaction(queryDB, errorCB);
}

// select all from SoccerPlayer
function queryDB(tx) {
	console.log('querying db for countries');
	//tx.executeSql('SELECT * FROM countries',[],queryListCountriesSuccess,errorCB);
}

function queryListCountriesSuccess(tx, result) {
	var resultLen = result.rows.length;
	console.log("listing countries starts.." + resultLen);
	$("#countryCode").text('');
	$("#population").text('');
	$("#country").text('');
	for ( var i = 0; i < resultLen; i++) {
		var row = result.rows.item(i);
		console.log("Iterating Rowss.." + row['code'] + ',' + row['population']	+ ',' + row['country']);
		$("#country").text('COUNTRY : ' + row['country']);
		$("#countryCode").text('COUNTRY CODE : ' + row['code']);
		$("#population").text('POPULATION : ' + row['population']);
	}
	console.log("listing countries ends..");
}

function queryCountry(tx) {
	tx.executeSql('SELECT * FROM countries where code=?', [ countryCode ],queryListCountriesSuccess, errorCB);
}
