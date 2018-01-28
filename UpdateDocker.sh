echo "Creating Docker Image"
docker build -t 'pylps-fe' .
echo "Retrieving Installed Docker Images"
docker images
