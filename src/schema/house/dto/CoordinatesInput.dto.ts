import { InputType, Field ,Float} from "type-graphql";
import {Min,Max  } from "class-validator";
@InputType()
export class CoordinatesInput {
  @Min(-90)
  @Max(90)
  @Field((_type) => Float)
  latitude!: number;

  @Min(-180)
  @Max(180)
  @Field((_type) => Float)
  longitude!: number;
}
