



const config = require('../config')

const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

// Replace these with your GitHub credentials
const userName = config.GITHUB_USERNAME;
const botNumber = config.BOT_NUMBER;
const token = config.GITHUB_AUTH_TOKEN;
const repoName = 'SACHIBOT-MD-GITHUB-DATABASE';
const filePath = `${botNumber}`
const repodescription = '🚨 This is SACHIBOT-MD Database. Do not delete or modify anything in here.';

function sleepfordb(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Function to fetch data from GitHub API
async function githubApiRequest(url, method = 'GET', data = {}) {
  try {
    const options = {
      method,
      headers: {
        Authorization: `Basic ${Buffer.from(`${userName}:${token}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    };

    if (method === 'GET' || method === 'HEAD') {
      // Remove the body property for GET and HEAD requests
      delete options.body;
    } else {
      // For other methods (POST, PUT, DELETE, etc.), add the JSON.stringify data to the request body
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    return await response.json();
  } catch (error) {
    throw new Error(`GitHub API request failed: ${error.message}`);
  }
}


// 1. Function to search GitHub file
async function githubSearchFile(fileName) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}?ref=main`;
  const data = await githubApiRequest(url);

  // Check if the response is an array
  if (Array.isArray(data)) {
    return data.find((file) => file.name === fileName);
  } else {
    console.error('Unexpected data format received:', data);
    return null; // Return null or handle the error as needed
  }
}


// 2. Function to create a new GitHub file
async function githubCreateNewFile(fileName, content) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Create new file: ${fileName}`,
    content: Buffer.from(content).toString('base64'),
  };
  await githubApiRequest(url, 'PUT', data);
}

// 3. Function to delete a GitHub file
async function githubDeleteFile(fileName) {
  const file = await githubSearchFile(fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Delete file: ${fileName}`,
    sha: file.sha,
  };
  await githubApiRequest(url, 'DELETE', data);
}

// 4. Function to get GitHub file content
async function githubGetFileContent(fileName) {
  const file = await githubSearchFile(fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = file.download_url;
  const response = await fetch(url);
  return await response.text();
}

// 5. Function to clear GitHub file content and add new content
async function githubClearAndWriteFile(fileName, content) {
  const file = await githubSearchFile(fileName);
  if (!file) {
  const newRepo = await githubCreateNewRepo(repoName, repodescription);
if(newRepo){
    await githubCreateNewFile(fileName, content);
}else{
console.log('Got an Error while creating Database');
}
  } else {
    const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
    const data = {
      message: `Modify file: ${fileName}`,
      content: Buffer.from(content).toString('base64'),
      sha: file.sha,
    };
    await githubApiRequest(url, 'PUT', data);
  }
}

// 6. Function to delete an existing GitHub file and upload a new one
async function githubDeleteAndUploadFile(fileName, newContent) {
  await githubDeleteFile(fileName);
  await githubCreateNewFile(fileName, newContent);
}

// 7. Function to add new lines in an existing GitHub file
async function githubAddLinesToFile(fileName, linesToAdd) {
  const content = await githubGetFileContent(fileName);
  const updatedContent = content + '\n' + linesToAdd;
  await githubClearAndWriteFile(fileName, updatedContent);
}

// 8. Function to modify an existing GitHub file
/*//8.1 sub function for it
function modifyContent(content, property, newValue) {
    
}
//8.2 main function for it
async function githubModifyFile(fileName, property, newValue) {
    const content = await githubGetFileContent(fileName);
module.exports.property = newValue; 
//    const modifiedContent = modifyContent(content, property, newValue);
//  return modifiedContent;
    await githubClearAndWriteFile(fileName, modifiedContent);
}*/

// Function to modify the LOGO property in the content
function modifyContent(content, property, newValue) {
  const regex = new RegExp(`${property}:\\s*'[^']*'`);
  const modifiedContent = content.replace(regex, `${property}: '${newValue}'`);
  return modifiedContent;
}

// Function to modify an existing GitHub file
async function githubModifyFile(fileName, property, newValue) {
  try {
    const content = await githubGetFileContent(fileName);
    const modifiedContent = modifyContent(content, property, newValue);
    await githubClearAndWriteFile(fileName, modifiedContent);
    return modifiedContent;
  } catch (error) {
    throw new Error(`Failed to modify file: ${fileName}. Error: ${error.message}`);
  }
}




// 9. Function to execute multiple functions in sequence
async function githubExecuteSequentially(functionsArray) {
  for (const func of functionsArray) {
    await func();
  }
}

// 10. Function to get all files in a specific filepath and save their contents using fs
async function githubSaveFilesLocally() {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}?ref=main`;
  const files = await githubApiRequest(url);
  
  for (const file of files) {
    const fileName = file.name;
    const content = await githubGetFileContent(fileName);
    fs.writeFileSync(fileName, content, 'utf-8');
  }
}

// 11. Function to get all files in the specified filepath
async function githubGetAllFilesInPath() {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}?ref=main`;
  const files = await githubApiRequest(url);
  return files.map(file => file.name);
}

//12. Function to search for a file in GitHub, download, and save it locally
async function searchAndDownloadFile(searchFileName, defaultFileName,defaultFileContent, localFileName){
  try {
    // Step 1: Search for the file on GitHub
    const searchResult = await githubSearchFile(searchFileName);

    if (searchResult) {
      // Step 2: If file found, download and save it locally
      const fileContent = await githubGetFileContent(searchFileName);
      const localFilePath = path.join(__dirname, localFileName);
      fs.writeFileSync(localFilePath, fileContent, 'utf-8');
      console.log(`saved in: ${localFilePath}`)
      console.log(`File "${searchFileName}" found on GitHub. Downloaded and saved as "${localFileName}".`);
    } else {
     

      // Step 4: Save the default content locally with the specified localFileName
      const localFilePath = path.join(__dirname, localFileName);
      fs.writeFileSync(localFilePath, defaultFileContent, 'utf-8');
console.log(`can not  find File "${searchFileName}".saved default in: ${localFilePath}`)
      // Step 5: Upload the default content as the searchFileName to GitHub
      await githubClearAndWriteFile(searchFileName, defaultFileContent);
      console.log(`File "${searchFileName}" not found on GitHub. Created and uploaded as "${localFileName}".`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}





//13. Function to create a new GitHub repository
// 13.1 Function to check if a GitHub repository already exists
async function githubCheckRepoExists(repoName) {
  const url = `https://api.github.com/repos/${userName}/${repoName}`;
  try {
    const response = await githubApiRequest(url, 'GET');
    return response && response.id ? true : false;
  } catch (error) {
    // If the repository does not exist, an error will be thrown, and we catch it here
    return false;
  }
}
//13.2 new repo save
async function githubCreateNewRepo(repoName, repoDescription) {
    const repoExists = await githubCheckRepoExists(repoName);

  if (repoExists) {
    console.log(`Repository "${repoName}" already exists.`);
    return repoExists;
  }
  const url = `https://api.github.com/user/repos`;
  const data = {
    name: repoName,
    description: repoDescription,
    private: true, // You can set this to true if you want a private repository
  };

  try {
    const response = await githubApiRequest(url, 'POST', data);
    return response;
  } catch (error) {
    throw new Error(`Failed to create repository: ${error.message}`);
  }
}

// 14. Function to create a new GitHub audio file
async function githubNewAudioFile(fileName, audioContent) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Create new audio file: ${fileName}`,
    content: Buffer.from(audioContent, 'base64').toString('base64'),
    encoding: 'base64',
  };

  await githubApiRequest(url, 'PUT', data);
}

module.exports = {
  githubSearchFile,
  githubCreateNewFile,
  githubDeleteFile,
  githubGetFileContent,
  githubClearAndWriteFile,
  githubDeleteAndUploadFile,
  githubAddLinesToFile,
  githubModifyFile,
  githubExecuteSequentially,
  githubSaveFilesLocally,
  githubGetAllFilesInPath,
  searchAndDownloadFile,
  githubCreateNewRepo,
  githubCheckRepoExists,
};




/*//-----------------Example-Usage------------

const {
  githubSearchFile,
  githubCreateNewFile,
  githubDeleteFile,
  githubGetFileContent,
  githubClearAndWriteFile,
  githubDeleteAndUploadFile,
  githubAddLinesToFile,
  githubModifyFile,
  githubExecuteSequentially,
  githubSaveFilesLocally,
  searchAndDownloadFile,
} = require('./github');

async function exampleUsage() {
  try {
    // 1. Search for a file on GitHub
    const searchResult = await githubSearchFile('existingfile.txt');
    console.log('Search Result:', searchResult);

    // 2. Create a new file on GitHub
    await githubCreateNewFile('newfile.txt', 'This is the content of the new file.');

    // 3. Delete an existing file on GitHub
    await githubDeleteFile('existingfile.txt');

    // 4. Get the content of a file from GitHub
    const content = await githubGetFileContent('newfile.txt');
    console.log('File Content:', content);

    // 5. Clear and write content to an existing or new file on GitHub
    await githubClearAndWriteFile('existingfile.txt', 'Updated content of the existing file.');

    // 6. Delete an existing file and upload a new one on GitHub
    await githubDeleteAndUploadFile('existingfile.txt', 'This is the content of the new file.');

    // 7. Add new lines to an existing file on GitHub
    await githubAddLinesToFile('existingfile.txt', 'This is a new line.');

    // 8. Modify the content of an existing file on GitHub
    await githubModifyFile('existingfile.txt', 'PREFIX', '/');
    
    // 9. Execute multiple functions in sequence
    await githubExecuteSequentially([
      () => githubCreateNewFile('file1.txt', 'File 1 content.'),
      () => githubCreateNewFile('file2.txt', 'File 2 content.'),
      () => githubAddLinesToFile('file1.txt', 'Additional line in File 1.'),
    ]);

    // 10. Save all files from the specified filepath locally
    await githubSaveFilesLocally();

    // 11. Function to get all files in the specified filepath
    async function githubGetAllFilesInPath() {
    const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}?ref=main`;
    const files = await githubApiRequest(url);
    return files.map(file => file.name);
  }
//12. Function to search for a file in GitHub, download, and save it locally

// Replace 'botnumber-config.txt', 'defaultconfig.txt', and 'cooo.js' with your desired filenames
const searchFileName = 'botnumber-config.txt';
const defaultFileName = 'defaultconfig.txt';
const localFileName = 'cooo.js';

// Call the function to search and download/upload the file
searchAndDownloadFile(searchFileName, defaultFileName, localFileName);

//13. create new repo
githubCreateNewRepo('repoName', 'repoDescription')

  } catch (error) {
    console.error('Error:', error.message);
  }
}

exampleUsage();
*/
