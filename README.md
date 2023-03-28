# BI1 - node-azure

This is a microservice written in javascript whose purpose is to use Azure as data source for Business Intelligence.

You can find main instructions and important informations to work with the project below. Some more informations about choices we've made and diagrams can be found in [our wiki](https://github.com/CPNV-ES-BI/BI_NODE_AZURE/wiki) as well.

## Installation

This project requires node. We are using node v18.12 and npm v9.1.2. 

It can be downloaded from [the official website](https://nodejs.org/).

When you have node installed in your development environment, you can

`npm install`

## Environment

This project is using a `.env` file to store to connection sting to Azure. An sample file named `.env.exemple` can be found and has to be renamed and filled.

## Usage

To build the container use `docker compose build`.

And to run the container use `docker compose up`.

The API will be available on port 3000.

### Table of routes
| Route | Method | Description |
| --- | --- | --- |
| /data-objects/{id} | GET | download dataObject |
| /data-objects/{id} | POST | create a new dataObject|
| /data-objects/{id} | DELETE | Delete the specified dataObject |
| /data.objects/{id}/publish | PUT | Publish the dataObject|

### Swagger

A Swagger is available while running the server at `http://<url>/api-docs`.

## Testing

To run test you can just run `npm run test`.

## File structure

```
+---doc // directory where you can find the documentation of the project   
|       
+---src
|   +---lib
|   |       
|   +---models
|   |
|   +---routes // directory where you can find the routes files
|       |
|       +---api // directory where you can find the api routes 
+---tests
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

[MIT](https://github.com/CPNV-ES-BI/BI_NODE_AZURE/blob/main/LICENSE)

## Authors

* [SemicolonManifest](https://github.com/SemicolonManifest)
* [HDubuis](https://github.com/HDubuis)
