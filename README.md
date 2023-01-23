# BI1 - node-azure

This is a microservice written in javascript whose purpose is to us Azure as data source for Business Intelligence.

## Installation

This project requires node. We are using node v18.12 and npm v9.1.2. 

It can be downloaded from [the official website](https://nodejs.org/) or alternatively from [chocolatey](https://community.chocolatey.org/packages/nodejs).

When you have node installed in your development environment, you can

`npm install`

## Environment

This project is using a `.env` file to store to connection sting to Azure. An sample file named `.env.exemple` can be found and has to be renamed and filled.

## Usage

There is no usage method yet.
To build the container use `docker compose build`.
And to run the container use `docker compose up`.

## Testing

To run test you can just run `npm run test`.

## File structure

```
+---doc // directory where you can find the documentation of the project   
|
+---routes // directory where you can find the routes files
|       
+---src
|   +---controllers
|   |       
|   +---helpers
|   |       
|   \---models       
\---tests
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

All other requests are welcome by issues.

## License

[MIT](https://github.com/CPNV-ES-BI/BI_NODE_AZURE/blob/main/LICENSE)

## Authors

* [SemicolonManifest](https://github.com/SemicolonManifest)
* [HDubuis](https://github.com/HDubuis)
