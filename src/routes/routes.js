"use strict";

const multer = require("multer");
const DataObjectController = require("./api/dataObject/DataObjectController");
const dataObjectController = new DataObjectController();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (file.fieldname !== 'data') {
      return cb(new multer.MulterError('Unexpected field'))
    }
    cb(null, true)
  }
});
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../doc/swagger.json");

module.exports = async (app) => {
  app.route("/data-objects/:id").get(dataObjectController.download);
  app.post("/data-objects/:id", upload.single('data'), dataObjectController.create);
  app.route("/data-objects/:id").delete(dataObjectController.delete);
  app.route("/data-objects/:id/publish").put(dataObjectController.publish);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
