import { buildSchemaSync } from "type-graphql";
import { ImageResolver } from "./image";
import { HouseResolver } from "./house/HouseResolver";
import { authChecker } from "./auth";

export const schema = buildSchemaSync({
  resolvers: [ImageResolver, HouseResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
  authChecker,
});
