import { InputType, Field, Int } from "type-graphql";
import { CoordinatesInput } from "./CoordinatesInput.dto";

@InputType()
export class HouseInput {
  @Field((_type) => String)
  address!: string;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => CoordinatesInput)
  coordinates!: CoordinatesInput;

  @Field((_type) => Int)
  bedrooms!: number;
}