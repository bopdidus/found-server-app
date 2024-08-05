#To get the node image
FROM node:latest  
#create a working directory
WORKDIR /usr/src/app 
#copy all package.json file
COPY package*.json ./
#execute the command npm install to install dependencies
RUN npm install
# copy all to the working directory
COPY . .

#endpoints ports
EXPOSE 3000

CMD ["npm", "start"]
