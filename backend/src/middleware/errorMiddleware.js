const { Prisma } = require("@prisma/client");

const errorHandler = (error, req, res, next) => {
  if (res.headersSent) return next(error);
  let status = error.status || 500;
  let message = error.message || "Internal server error";

  if (error instanceof SyntaxError && error.type === "entity.parse.failed") {
    status = 400;
    message = "Request body must contain valid JSON";
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      status = 409;
      message = "A record with these values already exists";
    } else if (error.code === "P2025") {
      status = 404;
      message = "Requested record was not found";
    } else {
      status = 400;
      message = "Database operation could not be completed";
    }
  }

  if (status >= 500) console.error(error);
  res.status(status).json({ success: false, message });
};

module.exports = errorHandler;
