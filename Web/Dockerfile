FROM node:18

# Set working directory
WORKDIR /usr/app

# RUN apk --no-cache add shadow \                                                                   
#     gcc \                                                                                         
#     musl-dev \                                                                                    
#     autoconf \                                                                                    
#     automake \                                                                                    
#     make \                                                                                        
#     libtool \                                                                                     
#     nasm \                                                                                        
#     tiff \                                                                                        
#     jpeg \                                                                                        
#     zlib \                                                                                        
#     zlib-dev \                                                                                    
#     file \                                                                                        
#     pkgconf                                                                                      


# Installing dependencies
COPY package*.json /usr/app/
#RUN npm install

# Install PM2 globally
# RUN npm install --global pm2

# # Copy package.json and package-lock.json before other files
# # Utilise Docker cache to save re-installing dependencies if unchanged
# COPY ./package.json ./
# COPY ./package-lock.json ./

# Copy all files
COPY ./ ./

COPY ./start.sh /usr/local/bin/start.sh

RUN ["chmod", "+x", "/usr/local/bin/start.sh"]

# Install dependencies
RUN npm install 

# Build app
# RUN npm run build --debug

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
# USER node

# Run npm start script when container starts
#CMD [ "pm2-runtime", "npm", "--", "start" ]
# CMD [ "npm", "run", "dev" ]
# CMD [ "npm", "run", "start" ]
CMD ["/usr/local/bin/start.sh"]