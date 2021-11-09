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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

var updateTemplateDom = function(event) {
  var refNode;
  var newNodeContainer;
  var newNode;
  var parentNode;
  switch(event) {
    case 'SHOW_LOADING':
      refNode = document.getElementById('cards');
      parentNode = document.getElementById('content');
      newNodeContainer = document.createElement('div');
      newNode = document.createElement('div');
      
      refNode.style.display = 'none';
      newNodeContainer.className = 'loader-container';
      newNodeContainer.id = 'loader';
      newNode.className = 'loader';
      newNodeContainer.appendChild(newNode);

      parentNode.insertBefore(newNodeContainer, refNode);
      return;
    
    case 'SHOW_DATA':
      refNode = document.getElementById('cards');
      refNode.style.display = 'block';
      document.getElementById('content').removeChild(document.getElementById('loader'));
      return;
    
    case 'REMOVE_DATA':
      refNode = document.getElementById('cards');
      refNode.innerHTML = '';
  }
}
function getData() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(result) {
      return result.json();
    })
    .catch(function(error) {
      return error;
    })
}

function onLoad() {
  var userContainer;
  var userName;
  var userInfo;
  var userPhone;
  var userEmail;
  var users = document.getElementById('cards');
  getData()
    .then(function(result) {
      if (result.length > 0) {
        updateTemplateDom('SHOW_DATA');

        result.forEach(function(user) {
          userContainer = document.createElement('div');
          userContainer.className = 'card m-3 shadow-sm p-3 mb-5 bg-body rounded';
          
          userName = document.createElement('div');
          userName.innerHTML = user.name;
          userName.className = 'card-title m-2';
          userInfo = document.createElement('div');
          userInfo.className = 'card-text m-2';
          userEmail = document.createElement('div');
          userEmail.innerHTML = user.email;
          userPhone = document.createElement('div');
          userPhone.innerHTML = user.phone;

          userInfo.appendChild(userEmail);
          userInfo.appendChild(userPhone);
          userContainer.appendChild(userName);
          userContainer.appendChild(userInfo);

          users.appendChild(userContainer);
        })
      }
    })
    .catch(function(error) {
      // handle error
    })
}

function refresh() {
  updateTemplateDom('SHOW_LOADING');
  updateTemplateDom('REMOVE_DATA');
  onLoad();
}

// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//     // Cordova is now initialized. Have fun!
//     document.getElementById('deviceready').classList.add('ready');
// }

updateTemplateDom('SHOW_LOADING');
onLoad();
