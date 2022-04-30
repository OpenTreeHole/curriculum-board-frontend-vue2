# curriculum-board-frontend

Frontend of Curriculum Board

## Deploy

Install
This installation is just for frontend program. If you want to deploy the whole OpenTreeHole project, please visit Deploy Repo.

This project continuously integrates with docker. Go check it out if you don't have docker locally installed.

Since the Curriculum Board site requires the Auth site to provide authentication service, it's necessary to deploy at least these 2 site together. Thus, it's highly recommended to use docker-compose for deployment.

1. Download the [docker-compose.yaml](https://github.com/OpenTreeHole/curriculum-board-frontend-vue2/blob/master/docker-compose.yaml).
    ```shell
    wget https://github.com/OpenTreeHole/curriculum-board-frontend-vue2/blob/master/docker-compose.yaml
    ```

2. Create a ```.env``` file under the same directory with ```docker-compose.yaml```.
    ```shell
    nano .env
    ```
    
    To know more about environmental variables in docker, visit [Environment variables in Compose](https://docs.docker.com/compose/environment-variables/).

3. Set all environmental variables. The required env variables are listed below.
   ```dotenv
   # .env file
   
   # The backend api address for Curriculum Board
   CB_URL=https://cb.fduhole.com/api/
   
   # The backend api address for Auth
   AUTH_URL=https://auth.fduhole.com/api/
   
   # The frontend url for Auth.
   # If you use the default docker-compose to deploy locally, this should be http://localhost:3001/ .
   AUTH_BASE_URL=https://auth.fduhole.com/
   
   # The domain used to store cookie.
   # It should be the shared domain for Curriculum Board and auth frontend.
   # For local deployment, this should be localhost .
   COOKIE_DOMAIN=.fduhole.com
   ```

4. Docker Compose

   Check if the port 3000(for CB frontend) and 3001(for Auth frontend) is available. 
   You can change these port in ```docker-compose.yaml```.
   ```shell
   docker-compose up
   ```

5. Visit http://localhost:3000/ to see if the deployment is successful.

## Contribute

Feel free to dive in! [Open an issue](https://github.com/OpenTreeHole/curriculum-board-frontend-vue2/issues/new) or submit PRs.

### Development

```shell
# Clone the repository
git clone https://www.github.com/OpenTreeHole/curriculum-board-frontend-vue2.git
cd curriculum-board-frontend-vue2
# Install Dependencies
yarn
# Run The Dev Server
# If you don't want to use vite for bundle, you can run yarn serve to use webpack & vue-cli alternatively.
yarn serve-vite
```

The dev server will be launched after ```yarn serve-vite```. However, you'll soon find errors related to authentication issues.
This is because the project is depended on the auth site. You can use a test token in [src/apis/axios.ts](https://github.com/OpenTreeHole/curriculum-board-frontend-vue2/blobs/master/src/apis/axios.ts) for testing, or you can deploy the auth frontend at localhost, and set its url in ```.env.development```.
After any changes on env variables, you should restart the service.

To build the project, run
```shell
yarn build-vite # (or yarn build, for one who prefers webpack)
```

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/OpenTreeHole/curriculum-board-frontend-vue2/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=OpenTreeHole/curriculum-board-frontend-vue2" />
</a>
