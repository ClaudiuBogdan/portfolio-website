import { HttpException } from "next-api-decorators";
import { NextApiRequest, NextApiResponse } from "next/types";

export function exceptionHandler(
    error: Error,
    _: NextApiRequest,
    res: NextApiResponse
  ) {
    const statusCode = error instanceof HttpException ? error.statusCode : 500;
    const message =
      error instanceof HttpException ? error.message : "Internal server error";

    res.status(statusCode).json({
      statusCode,
      message,
    });
  }