# POS


POS is a react based offline app that can be used on personal computer either in browser
or as an software by using [React-electron-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

# New Features!

   - Lightweight
   - Offline 
    - Create backup and Restore Backup  
    - Edit value on site
    - High performance with less reloads


### Tech
POS uses following technolgies

* [React](https://reactjs.org) - HTML enhanced for web apps!
* [Rxdb](https://rxdb.info/) - awesome offline and online indexed database
* [Material-UI](material-ui.com/) - great UI library for modern web apps.
* [Electron](https://www.electronjs.org/) - Framework to create native apps with web technologies HTML,CSS and JavaScript 

### Installation



```sh
$ git clone https://github.com/kashi326/POS.git <your-project-name>
$ cd <your-project-name>
$ yarn / npm install (Yarn is recommended)
$ yarn start / npm start
```

For production environments...

```sh
$ git clone https://github.com/kashi326/POS.git <your-project-name>
$ cd <your-project-name>
$ yarn / npm install (Yarn is recommended)
$ yarn build / npm build
$ cd dist
```

Linux Users
In dist directory 
```sh
$ ./<your-project-name>-0.1.0.AppImage
```
OR 
open dist Directory and double click <your-project-name>-0.1.0.AppImage.
AppImage should have excutable permission.To check permission either right click AppImage, select properties then open permission or in teminal type
```sh
$ ls -a
```
If permission is less than 777 run following command
```sh
$ chmod 777 <your-project-name>-0.1.0.AppImage
```
Window users

in dist Directory double <your-project-name>-0.1.0.exe and install exe. It will create a shortuct on desktop.

or

In cmd run following commands
```sh
$ <your-project-name>-0.1.0.exe
```

### How to use
- Enter Your Store Details like name, address and contact info 
- create a username and password
- if You have a backup. Restore Backup from Setting->restore Backup option

### Note
- yarn is recommended as it have less problems (npm is also fine). yarn can be installed from [here](https://classic.yarnpkg.com/en/docs/install/)
- POS is under development and more feature will be adding in incremental way.
- If there is a problem. Open an issue.

### Credits

   - [kashi326]( https://github.com/kashi326)
