// ====================
// Utility Functions
// ====================
const fs = require('fs');

function getConfigs(){
  const rawData = fs.readFileSync('configs.json', 'utf-8');
  const updatedConfig = JSON.parse(rawData);
  return updatedConfig
}

function emitUpdatedUsers(io) {
  const rawData = fs.readFileSync('users.json', 'utf-8');
  const updatedUsers = JSON.parse(rawData);
  io.emit('updateTable', updatedUsers);  // Emit to all connected clients
}


function emitUpdatedConfigs(io) {
  const rawData = fs.readFileSync('configs.json', 'utf-8');
  const updatedConfig = JSON.parse(rawData);
  io.emit('updateConfigs', updatedConfig);  // Emit to all connected clients
}

function usersAdd(user) {

  // Read the existing users from the JSON file
  const rawData = fs.readFileSync('users.json', 'utf-8');
  const users = JSON.parse(rawData);

  // Add the new user to the list
  users.push(user);

  // Write the updated users list back to the JSON file
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

  return user;
}

function verifyUser(userIP) {
  let user = usersSearchByIP(userIP);
  let bool = false;
  if (user) {
    bool = true;
  }

  return bool;
}

function usersSearchByIP(userIP) {
  // Read the existing users from the JSON file
  const rawData = fs.readFileSync('users.json', 'utf-8');
  const users = JSON.parse(rawData);

  // Search for the user by IP
  const user = users.find(u => u.ip === userIP);

  return user;
}

function usersRemove(userIP) {
  // Read the existing users from the JSON file
  const rawData = fs.readFileSync('users.json', 'utf-8');
  const users = JSON.parse(rawData);

  // Find the user by IP
  const index = users.findIndex(user => user.ip === userIP);

  let removedUser;
  if (index !== -1) {
    // Remove the user
    removedUser = users.splice(index, 1)[0];

    // Write the updated users list back to the JSON file
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
  }

  return removedUser;
}



function usersRemoveAll() {
  // Create an empty array to represent no users
  const users = [];

  // Write the empty array back to the JSON file
  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

  return users;  // Return the empty users array for confirmation
}


function usersModify(userIP, attributesToUpdate) {
  // Read the existing users from the JSON file
  const rawData = fs.readFileSync('users.json', 'utf-8');
  const users = JSON.parse(rawData);

  // Find the user by IP
  const user = users.find(u => u.ip === userIP);

  if (user) {
    // Modify the desired attributes
    for (let key in attributesToUpdate) {
      user[key] = attributesToUpdate[key];
    }

    // Write the updated users list back to the JSON file
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    return user;  // Return the modified user
  }

  return null;  // Return null if user is not found
}

function configsModify(banks, attributesToUpdate) {
  // Read the existing users from the JSON file
  const rawData = fs.readFileSync('configs.json', 'utf-8');
  const configs = JSON.parse(rawData);

  // Find the user by IP
  const config = configs.find(u => u.banks === banks);

  if (config) {
    // Modify the desired attributes
    for (let key in attributesToUpdate) {
      config[key] = attributesToUpdate[key];
    }


    // Write the updated users list back to the JSON file
    fs.writeFileSync('configs.json', JSON.stringify(configs, null, 2));

    return config;  // Return the modified user
  }

  return null;  // Return null if user is not found
}

module.exports = {
  emitUpdatedUsers,
  usersAdd,
  verifyUser,
  usersSearchByIP,
  usersRemove,
  usersModify,
  usersRemoveAll,
  configsModify,
  emitUpdatedConfigs,
  getConfigs
}